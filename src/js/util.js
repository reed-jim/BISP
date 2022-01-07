import { useHistory } from "react-router";

const lockScroll = (isLock) => {
    const body = document.getElementsByTagName('body');

    body[0].style.overflow = isLock ? 'hidden' : '';
}

const pushPath = (history, append) => {
    let currentPath = history.location.pathname;

    const len = currentPath.length;

    if (currentPath[len - 1] == '/') {
        currentPath = currentPath.slice(0, len - 1);
    }

    history.push(`${currentPath}/${append}`);
}
// change current path and save previous path, add a new search param
const appendParam = (history, append) => {
    let currentPath = history.location.pathname;
    const search = history.location.search;

    const len = currentPath.length;

    if (currentPath[len - 1] == '/') {
        currentPath = currentPath.slice(0, len - 1);
    }

    if (search == "") {
        append = "?" + append;
    }
    else {
        append = "&" + append;
    }

    history.push(currentPath + search + append);
}

// const changePath = (history, newPath) => {
//     history.replace(newPath);
// }

// replace current path, push new path to stack, able to redirect to previous path
const changePath = (history, newPath) => {
    history.push(newPath);
}

const setLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

const setSessionStorage = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
}

const getSessionStorage = (key) => {
    return JSON.parse(sessionStorage.getItem(key));
}

const isLocalStorageKeyExist = (key) => {
    return localStorage.getItem(key) != null
}

const isNullOrUndefined = (obj) => {
    return obj == null || obj == undefined
}

const getCurrentDate = () => {
    var today = new Date();
    var dateStr = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    return dateStr;
}

const convertDate = (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var d = new Date(date);
    var dateStr = monthNames[d.getMonth() + 1] + " " + d.getDate() + ", " + d.getFullYear();

    return dateStr;
}

const gradientPropeties = () => {
    const keep = Math.floor(Math.random() * 3);

    let start = {};
    let step = {};

    for (let i = 0; i < 3; i++) {
        if (i != keep) {
            start[i] = 50 + Math.floor(Math.random() * 50);
            step[i] = (Math.random() * (0.20 - 0.0200) + 0.0200).toFixed(1);
        }
        else {
            start[i] = 255;
            step[i] = 0
        }
    }

    return { start: start, step: step }
}

const gradientColor = (i, start, step) => {
    // const c = "#" + Math.floor(Math.random()*16777215).toString(16);
    // const c = "#" + (0x1000000+(i*step)*0xffffff).toString(16).substr(1,6)
    // console.log(c);

    const r = Math.min(start[0] + (i * step[0]) * 255, 255);
    const g = Math.min(start[1] + (i * step[1]) * 255, 255);
    const b = Math.min(start[2] + (i * step[2]) * 255, 255);

    const c = `rgb(${r},${g},${b})`

    return c
}

export {
    lockScroll, pushPath, appendParam, changePath, setLocalStorage, getLocalStorage, isLocalStorageKeyExist, setSessionStorage,
    getSessionStorage, isNullOrUndefined, getCurrentDate, convertDate, gradientPropeties, gradientColor
}
