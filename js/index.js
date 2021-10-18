'use strict';
let currentScroll=0;
let tim;
window.onload=function(){
    let elm=document.querySelectorAll('.section');
    for(let i=0;i<elm.length;i++){
        elm[i].addEventListener('mousewheel',MouseWheelHandler,false);
        //firefox용
        elm[i].addEventListener("DOMMouseScroll",MouseWheelHandler,true);
    }
}
function MouseWheelHandler(e){
    e.preventDefault();
    let delta=0;
    if(!event)event=window.event;
    if(event.wheelDelta){
        delta=event.wheelDelta/120;
        if(window.opera)delta=-delta;
    }else if(event.detail)delda=-event.detail/3;

    let p=e.target.parentElement;

    let index= Array.prototype.indexOf.call(p.children, e.target);
    let elmArr = e.target.parentElement.children;
    currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    let NextTarget=currentScroll;
    //마우스휠 위로
    if(delta>0){
        if(index>0){
            let no=(index -1);
            NextTarget = elmArr[no].offsetTop;
        }
    }
    //마우스 아래로
    else if (delta < 0)
    {
        // 맨마지막 지점 제외
        if (index < elmArr.length - 1) {
            // 다음 dom 의 index 번호
            var no = (index + 1);
            // 좌표위치 저장
            NextTarget = elmArr[no].offsetTop;
        }
    }
    clearInterval(tim);
    tim = setInterval(tran, 1);
    function tran() {
        // 이동속도 숫자가 작아질수록 느려짐
        let speed = 7;
        // 현재 스크롤과 이동후 스크롤이 같으면 정지시킨다 
        if (currentScroll == NextTarget) {
            clearInterval(tran);
        } else {
            // 스크롤을 위로 올릴 경우
            if (currentScroll - speed > NextTarget)
            {
                currentScroll -= speed;
            }
            // 스크롤을 내일 경우
            else if (currentScroll + speed < NextTarget)
            {
                currentScroll += speed;
            }
            // 스크롤이 속도로 지정된 변수보다 작을 경우 강제적으로 맞춰준다
            else
            {
                currentScroll = NextTarget;
            }
            // 스크롤위치 변경
            window.scrollTo(0, currentScroll);
        }
    }
}
