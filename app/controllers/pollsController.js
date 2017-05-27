const Poll = require("../models/polls");
const User = require("../models/users");

module.exports = {
    new: (req, res) => {
        let newPoll = new Poll({
            title: req.body.title,
            date: new Date(),
            options: parseOptions(req.body)
        });
        newPoll.votes = initVotes(newPoll.options.length);
        newPoll.save();

        req.user.polls.push(newPoll._id);
        req.user.save();

        res.redirect("/polls");
    },
    vote: (req, res) => {
        Poll.find({}, (err, polls) => {
            const poll = polls[req.params.id];
            if ((req.user && poll.usersWhoVoted.map((id) => id.toHexString()).includes(req.user._id.toHexString())) || poll.ipsThatVoted.includes(req.ip || req.ips[0])) {
                res.render("polls/show", {alert: "You already voted on this poll.", poll: poll});
            }
            else {
                if (req.user)
                    poll.usersWhoVoted.push(req.user._id);
                else
                    poll.ipsThatVoted.push(req.ip || req.ips[0]);
                poll.votes[req.body.choice]++;
                poll.markModified("votes");
                poll.save();
                res.render("polls/show", {poll: poll})
            }
        });
    },
    index: (req, res) => {
        Poll.find({}, (err, polls) => {
            res.render("polls", {polls: polls});
        });
    },
    getNewForm: (req, res) => {
        res.render("polls/new");
    },
    show: (req, res) => {
        Poll.find({}, (err, polls) => {
            if (req.params.id >= 0 && req.params.id < polls.length)
                res.render("polls/show", {poll: polls[req.params.id]});
            else
                res.redirect("/polls");
        });
    },
    new_user: (req, res) => {
        res.redirect("/polls");

        Poll.find({}, (err, polls) => {
            polls.forEach((poll) => {
                poll.ipsThatVoted.forEach((ip, i) => {
                    if (ip === (req.ip || req.ips[0])) {
                        poll.usersWhoVoted.push(req.user._id);
                        delete poll.ipsThatVoted[i];
                        poll.save();
                    }
                });
            });
        });
    }
};

function initVotes(numOptions) {
    let votes = [];
    for (let i = 0; i < numOptions; i++) {
        votes.push(0);
    }
    return votes;
}

function parseOptions(body) {
    let options = [];
    let i = 0;
    while (body[`option-${i}`]) {
        options.push(body[`option-${i}`]);
        i++;
    }
    return options;
}
