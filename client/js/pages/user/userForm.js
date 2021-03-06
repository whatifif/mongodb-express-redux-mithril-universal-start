var m = require('mithril');

var userForm = {

    view: function(ctrl, arg) {

        var user = arg.userCopied;

        return m('',

            [m('', [
                m("h4", [
                    m("input.col-sm-2", {
                        value: user.userid,
                        onchange: function(e) {
                            user.userid = e.target.value
                        }
                    }, user.userid),
                    m("input.col-sm-2", {
                        placeholder: 'change password',
                        value: user.password || null,
                        onchange: function(e) {
                            user.password = e.target.value
                        }
                    }, user.userid),
                    m("input.col-sm-3", {
                        value: user.email,
                        onchange: function(e) {
                            user.email = e.target.value
                        }
                    }, user.email),
                    // m("input.col-sm-1", {
                    //     value: user.verified,
                    //     onchange: function(e) {
                    //         user.verified = e.target.value
                    //     }
                    // }, user.verified),
                    m('.col-sm-1', m("select.form-control", {
                        style: 'padding: 2px;height:25px;',
                        value: user.verified,
                        onchange: function(e) {
                            user.verified = e.target.value;
                        }
                    }, [m('option', 'true'), m('option', 'false')])),
                    // m("input.col-sm-2", {
                    //     value: user.role,
                    //     onchange: function(e) {
                    //         user.role = e.target.value
                    //     }
                    // }, user.role),
                    m('.col-sm-2',m("select.form-control", {
                        style: 'padding: 2px;height:25px;',
                        value: user.role,
                        onchange: function(e) {
                            user.role = e.target.value
                        }
                    }, [m('option', 'member'), m('option', 'author'), m('option', 'admin')])),
                    m('.pull-right', [
                        m('span.label.label-primary', {
                            onclick: arg.save
                        }, 'save'),
                        m('span.label.label-default', {
                            onclick: arg.cancel
                        }, 'cancel'),
                        m('span.label.label-danger', {
                            onclick: arg.remove.bind(this, user)
                        }, 'delete')
                    ])
                ]),
                m('p'),
                m('hr', {
                    style: "width:100%"
                })
            ])]
        )
    }
}

module.exports = userForm;
