import Noty from "noty";

export default function notify(text, type = 'error') {
    new Noty({
        text: text,
        type: type,
        timeout: 2000,
    }).show();
}