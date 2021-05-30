const controller = {
    getIndex: function (req, res) {
        res.render('index');
    },

    getAboutUs: function (req, res) {
        res.render('about-us');
    }
}

module.exports = controller;