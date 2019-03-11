from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, url, NumberRange, IPAddress

class URL_Form(FlaskForm):
    url = StringField(
        None,
        [
            DataRequired(),
            url(
                require_tld=True,
                message="You must enter a valid, top-level domain URL."
            )
        ]
    )

    port = IntegerField(
        None,
        [
            DataRequired(),
            NumberRange(
                min=0,
                max=65535, 
                message="Invalid port number.")
        ]
    )

class IP_Form(FlaskForm):
    ip = StringField(
        None,
        [
            DataRequired(),
            IPAddress(
                message="Invalid IP address."
            )
        ]
    )

    ip_port = IntegerField(
        None,
        [
            DataRequired(),
            NumberRange(
                min=0,
                max=65535, 
                message="Invalid port number.")
        ]
    )