import { useHistory } from "react-router";

const lockScroll = (isLock) => {
    const body = document.getElementsByTagName('body');

    body[0].style.overflow = isLock ? 'hidden' : '';
}

const appendPath = (history, append) => {
    let currentPath = history.location.pathname;

    const len = currentPath.length;

    if (currentPath[len - 1] == '/') {
        currentPath = currentPath.slice(0, len - 1);
    }

    history.push(`${currentPath}/${append}`);
}

export { lockScroll, appendPath }
