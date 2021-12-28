let turn = 0;
let health1 = 0;
let health2 = 0;
let r = 1;;
let won1 = 0;
let won2 = 0;
let tot_dmg1 = 0;
let tot_dmg2 = 0;
let health = Array.from(document.getElementsByClassName('health'));

let changecolor = (p) => {
    let h=p===1 ? health1 : health2;
    if (h >= 75 ) {
        health[p-1].style['background-color'] = '#139f13';
    }
    else if (h >= 50) {
        health[p-1].style['background-color'] = 'greenyellow';
    }
    else if (h >= 25) {
        health[p-1].style['background-color'] = 'orange';
    }
    else {
        health[p-1].style['background-color'] = 'red';
    }
}

start.addEventListener("click", () => {
    round.innerHTML = `Round ${r}`;
    won1=0;
    won2=0;
    health[0].style['background-color'] = '#139f13';
    health[1].style['background-color'] = '#139f13';
    MainMenu.style['display'] = 'none';
    container.style['display'] = 'flex';
    health1 = 100;
    health2 = 100;
    health[1].style['height'] = `${health2}%`;
    health[0].style['height'] = `${health1}%`;
    health[0].innerText = `${health1}`;
    health[1].innerText = `${health2}`;
    player1.innerText = `Player 1: ${won1}`;
    player2.innerText = `Player 2: ${won2}`;
    next.style['display']='none';
    shoot.style['display']='inline-block';
    turn = 1;
});

GoMenu.addEventListener("click", () => {
    container.style['display'] = 'none';
    MainMenu.style['display'] = 'flex';
    container.style['display'] = 'none';
    turn = 0;
    health[0].innerText = `${health1}`;
    health[1].innerText = `${health2}`;
})

let game_complete = (p) => {
    container.style['display'] = 'none';
    MainMenu.style['display'] = 'flex';
    head.innerText = `Player ${p} Won the Match`;
    again.style['display'] = 'inline-block';
    start.style['display'] = 'none';
    r = 1;
    tot_dmg1 = 0;
    tot_dmg2 = 0;
}

let round_win = (p) => {
    round.innerHTML = `<h3>Player ${p} Won Round ${r}</h3>`;
    if (p === 1) {
        won1++;
        health2 = 0;
        health[1].style['height'] = `${health2}%`;
        health[1].innerText = `${health2}`;
        if (won1 == 3) {
            game_complete(1);
        }
    }
    else {
        won2++;
        health1 = 0;
        health[0].style['height'] = `${health1}%`;
        health[0].innerText = `${health1}`;
        if (won2 == 3) {
            game_complete(2);
        }
    }
    shoot.style['display'] = 'none';
    next.style['display'] = 'inline-block';
}

shoot.addEventListener("click", () => {
    let strike = Math.floor(Math.random() * 5) + 1;
    if (turn === 1) {
        tot_dmg1 += strike;
        gunleft.style['visibility'] = 'visible';
        setTimeout(hidegunimage, 600, 1);
        health2 = health2 - strike;
        if (health2 <= 0) {
            ;
            round_win(1);
        }
        else {
            health[1].style['height'] = `${health2}%`;
            health[1].innerText = `${health2}`;
            changecolor(2);
        }
        turn = 2;
    }
    else {
        tot_dmg2 += strike;
        gunright.style['visibility'] = 'visible';
        setTimeout(hidegunimage, 600, 2);
        health1 = health1 - strike;
        if (health1 <= 0) {
            round_win(2);
        }
        else {
            health[0].style['height'] = `${health1}%`;
            health[0].innerText = `${health1}`;
            changecolor(1);
        }
        turn = 1;
    }
})

next.addEventListener('click', () => {
    shoot.style['display'] = 'inline-block';
    next.style['display'] = 'none';
    health1 = 100;
    health2 = 100;
    health[1].style['height'] = `${health2}%`;
    health[0].style['height'] = `${health1}%`;
    health[0].innerText = `${health1}`;
    health[1].innerText = `${health2}`;
    player1.innerText = `Player 1: ${won1}`;
    player2.innerText = `Player 2: ${won2}`;
    r++;
    round.innerHTML = `<h3>Round ${r}</h3>`;
    if (r < 5) {
        turn = (r === 1 ? 2 : 1);
    }
    else {
        turn = (tot_dmg1 < tot_dmg2 ? 1 : 2);
    }
    health[0].style['background-color'] = '#139f13';
    health[1].style['background-color'] = '#139f13';
})

again.addEventListener('click', () => {
    head.innerText = `Shoot Ahead`;
    again.style['display'] = 'none';
    start.style['display'] = 'inline-block';
})

let hidegunimage = (p) => {
    if (p === 1) {
        gunleft.style['visibility'] = 'hidden';
    }
    else {
        gunright.style['visibility'] = 'hidden';
    }
}

