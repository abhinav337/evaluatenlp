export function checkUrl(input) {

    const type1 = 'http://';
    const type2 = 'https://';

    if(input.slice(0,7) === type1 || input.slice(0,8) === type2) {
        return true;
    } else {
        return false;
    }

}