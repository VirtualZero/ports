from flask import request, render_template, jsonify
from ports import app
from ports.forms.forms import URL_Form, IP_Form
import subprocess


@app.route('/')
def ports():
    url_form = URL_Form()
    ip_form = IP_Form()
    return render_template(
        'ports/ports.html',
        url_form=url_form,
        ip_form=ip_form,
        title="Port Checker"
    )


@app.route('/port-by-url', methods=['POST'])
def port_by_url():
    url_form = URL_Form()

    if url_form.validate_on_submit():
        url = url_form.url.data.split('://')[1]
        port = url_form.port.data
        status="closed"

        command = f"nmap -p {port} {url}"
        
        result = subprocess.run(
            command,
            stdout=subprocess.PIPE,
            shell=True
        ).stdout.decode('utf-8')

        if ' open ' in result:
            status = "open"

        elif '0 IP addresses (0 hosts up)' in result:
            status = "failed_to_resolve"

        return jsonify(dict(status=status))

    else:
        for key, value in url_form.errors.items():
            field = key
            error = value[0]

        return jsonify(
            dict(
                status='form_error',
                field=field,
                error=error
            )
        )


@app.route('/port-by-ip', methods=['POST'])
def port_by_ip():
    ip_form = IP_Form()
    if ip_form.validate_on_submit():
        ip = ip_form.ip.data
        port = ip_form.ip_port.data
        status="closed"

        command = f"nmap -p {port} {ip}"

        result = subprocess.run(
            command,
            stdout=subprocess.PIPE,
            shell=True
        ).stdout.decode('utf-8')

        if ' open ' in result:
            status = "open"

        elif ' (0 hosts up) ' in result:
            status = "host_down"

        return jsonify(dict(status=status))

    else:
        for key, value in ip_form.errors.items():
            field = key
            error = value[0]

        return jsonify(
            dict(
                status='form_error',
                field=field,
                error=error
            )
        )