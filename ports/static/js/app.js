function showResults() {
    if (urlButtonRow.style.display === 'none') {
        urlButtonRow.style.display = 'block';
    }

    if (preloader.style.display === 'block') {
        preloader.style.display = 'none';
    }

    if (document.getElementById('results-section').style.display === 'none') {
        document.getElementById('results-section').style.display = 'block';
    }
}

function show403() {
    if (urlButtonRow.style.display === 'none') {
        urlButtonRow.style.display = 'block';
    }

    if (preloader.style.display === 'block') {
        preloader.style.display = 'none';
    }

    if (document.getElementById('results-section').style.display === 'none') {
        document.getElementById('results-section').style.display = 'block';
    }
}

$(document).ready(function (e) {

    $('#url-form').on('submit', function (e) {
        e.preventDefault();

        if (document.getElementById('invalid-url').style.display === 'block') {
            document.getElementById('invalid-url').style.display = 'none';
        }

        if (document.getElementById('invalid-port-number').style.display === 'block') {
            document.getElementById('invalid-port-number').style.display = 'none';
        }

        url = document.getElementById('url').value;
        port = document.getElementById('port').value;

        if (port > 65535 || port < 0) {
            document.getElementById('invalid-port-number').style.display = 'block';
            document.getElementById('invalid-port-number').innerHTML = '<span>Invalid port number.</span>'
            return
        }

        preloader = document.getElementById('preloader');
        urlButtonRow = document.getElementById('url-button-row');

        if (urlButtonRow.style.display != 'none') {
            urlButtonRow.style.display = 'none';
        }

        if (preloader.style.display === 'none') {
            preloader.style.display = 'block';
        }

        new_byurl_request = $.ajax({
            url: '/port-by-url',
            type: 'POST',
            data: $('#url-form').serialize(),
            statusCode: {
                403: function () {
                    show403();
                    document.getElementById('results-text').innerHTML = '<strong><p class="white-text flow-text">Session Expired!</p></strong> <p class="flow-text white-text"><i class="fas fa-exclamation-triangle red-text text-accent-1"></i> &nbsp;Please refresh the page.</p>';
                }
            },
            success: function (response) {
                if (response.status === 'open') {
                    showResults();
                    document.getElementById('results-text').innerHTML = '<strong><p class="white-text flow-text">Results for ' + url + ':</p></strong> <p class="flow-text white-text"><i class="fas fa-check green-text text-lighten-2"></i> &nbsp;Port ' + port + ' is open.</p>';
                    M.toast({
                        html: '<p><i class="fas fa-1x fa-check green-text text-lighten-2 center"></i></p> &nbsp;&nbsp;&nbsp;<p>Open!</p>',
                        classes: 'grey darken-3 button-border-purple white-text'
                    });
                }

                else if (response.status === 'failed_to_resolve') {
                    showResults();
                    document.getElementById('results-text').innerHTML = '<strong><p class="white-text flow-text">Results for ' + url + ':</p></strong> <p class="flow-text white-text"><i class="fas fa-exclamation-triangle red-text text-accent-1"></i> &nbsp;Failed to resolve URL.</p>';
                    M.toast({ html: '<p><i class="fas fa-exclamation-triangle red-text text-accent-1"></i></p> &nbsp;&nbsp;&nbsp;<p>Failed to resolve URL!</p>', classes: 'grey darken-3 button-border-purple white-text' })
                }

                else if (response.status === 'closed') {
                    showResults();
                    M.toast({ html: '<p><i class="fas fa-times red-text text-accent-1 center"></i></p> &nbsp;&nbsp;&nbsp;<p>Closed!</p>', classes: 'grey darken-3 button-border-purple white-text' })
                    document.getElementById('results-text').innerHTML = '<strong><p class="white-text flow-text">Results for ' + url + ':</p></strong> <p class="flow-text white-text"><i class="fas fa-times red-text text-accent-1"></i> &nbsp;Port ' + port + ' is closed.</p>';
                }

                else if (response.status === 'form_error') {
                    if (urlButtonRow.style.display === 'none') {
                        urlButtonRow.style.display = 'block';
                    }

                    if (preloader.style.display === 'block') {
                        preloader.style.display = 'none';
                    }

                    if (response.field === 'port') {
                        document.getElementById('invalid-port-number').style.display = 'block';
                        document.getElementById('invalid-port-number').innerHTML = '<span>' + response.error + '</span>';
                    }

                    else if (response.field === 'url') {
                        document.getElementById('invalid-url').style.display = 'block';
                        document.getElementById('invalid-url').innerHTML = '<span>' + response.error + '</span>';
                    }
                }

                else if (response.redirect) {
                    window.location.href = response.redirect
                }

                else {
                    console.log("Failed")
                    console.log(response.status);
                    console.log(response.field)
                    console.log(response.error)
                }
            }
        });
    });
});

function ipShowResults() {
    if (ipButtonRow.style.display === 'none') {
        ipButtonRow.style.display = 'block';
    }

    if (ip_preloader.style.display === 'block') {
        ip_preloader.style.display = 'none';
    }

    if (document.getElementById('ip-results-section').style.display === 'none') {
        document.getElementById('ip-results-section').style.display = 'block';
    }
}

$(document).ready(function (e) {

    $('#ip-form').on('submit', function (e) {
        e.preventDefault();

        if (document.getElementById('invalid-ip').style.display === 'block') {
            document.getElementById('invalid-ip').style.display = 'none';
        }

        if (document.getElementById('ip-invalid-port-number').style.display === 'block') {
            document.getElementById('ip-invalid-port-number').style.display = 'none';
        }

        ip = document.getElementById('ip').value;
        port = document.getElementById('ip_port').value;

        split_ip = ip.split('.');

        for (var i = 0; i < 4; i++) {
            if (parseInt(split_ip[i]) > 255) {
                if (document.getElementById('invalid-ip').style.display === 'none') {
                    document.getElementById('invalid-ip').style.display = 'block';
                    document.getElementById('invalid-ip').innerHTML = '<span>Invalid IP address.</span>'
                    return
                }
            }
        }

        if (port > 65535 || port < 0) {
            document.getElementById('ip-invalid-port-number').style.display = 'block';
            document.getElementById('ip-invalid-port-number').innerHTML = '<span>Invalid port number.</span>'
            return
        }

        ip_preloader = document.getElementById('ip-preloader');
        ipButtonRow = document.getElementById('ip-button-row');

        if (ipButtonRow.style.display != 'none') {
            ipButtonRow.style.display = 'none';
        }

        if (ip_preloader.style.display === 'none') {
            ip_preloader.style.display = 'block';
        }

        new_byip_request = $.ajax({
            url: '/port-by-ip',
            type: 'POST',
            data: $('#ip-form').serialize(),
            success: function (response) {
                if (response.status === 'open') {
                    ipShowResults();
                    document.getElementById('ip-results-text').innerHTML = '<strong><p class="white-text flow-text">Results for ' + ip + ':</p></strong> <p class="flow-text white-text"><i class="fas fa-check green-text text-lighten-2"></i> &nbsp;Port ' + port + ' is open.</p>';
                    M.toast({
                        html: '<p><i class="fas fa-1x fa-check green-text text-lighten-2 center"></i></p> &nbsp;&nbsp;&nbsp;<p>Open!</p>',
                        classes: 'grey darken-3 button-border-purple white-text'
                    });
                }

                else if (response.status === 'host_down') {
                    ipShowResults();
                    document.getElementById('ip-results-text').innerHTML = '<strong><p class="white-text flow-text">Results for ' + ip + ':</p></strong> <p class="flow-text white-text"><i class="fas fa-exclamation-triangle red-text text-accent-1"></i> &nbsp;Host is down.</p>';
                    M.toast({ html: '<p><i class="fas fa-exclamation-triangle red-text text-accent-1"></i></p> &nbsp;&nbsp;&nbsp;<p>Host is down!</p>', classes: 'grey darken-3 button-border-purple white-text' })
                }

                else if (response.status === 'closed') {
                    ipShowResults()
                    document.getElementById('ip-results-text').innerHTML = '<strong><p class="white-text flow-text">Results for ' + ip + ':</p></strong> <p class="flow-text white-text"><i class="fas fa-times red-text text-accent-1"></i> &nbsp;Port ' + port + ' is closed.</p>';
                    M.toast({ html: '<p><i class="fas fa-times red-text text-accent-1 center"></i></p> &nbsp;&nbsp;&nbsp;<p>Closed!</p>', classes: 'grey darken-3 button-border-purple white-text' })
                }

                else if (response.status === 'form_error') {
                    if (ipButtonRow.style.display === 'none') {
                        ipButtonRow.style.display = 'block';
                    }

                    if (ip_preloader.style.display === 'block') {
                        ip_preloader.style.display = 'none';
                    }

                    if (response.field === 'port') {
                        document.getElementById('ip-invalid-port-number').style.display = 'block';
                        document.getElementById('ip-invalid-port-number').innerHTML = '<span>' + response.error + '</span>';
                    }

                    else if (response.field === 'ip') {
                        document.getElementById('invalid-ip').style.display = 'block';
                        document.getElementById('invalid-ip').innerHTML = '<span>' + response.error + '</span>';
                    }
                }

                else if (response.redirect) {
                    window.location.href = response.redirect
                }

                else {
                    console.log("Failed")
                    console.log(response.status);
                    console.log(response.field)
                    console.log(response.error)
                }
            }
        });

        var csrf_token = "{{ csrf_token() }}";

        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrf_token);
                }
            }
        });
    });
});