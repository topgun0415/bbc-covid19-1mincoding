/** @format */

const actions = {
  birdFlies(key) {
    if (key) {
      document.querySelector(
        '[data-index="2"] .bird'
      ).style.transform = `translateX(${window.innerWidth}px)`;
    } else {
      document.querySelector(
        '[data-index="2"] .bird'
      ).style.transform = `translateX(-100%)`;
    }
  },
};

// 전역변수 선언을 자제하기 위해 즉시실행 함수로 scroll section 을 data-inedex로 묶어줄 예정
(() => {
  const graphicElems = document.querySelectorAll('.graphic-item');
  const stepElems = document.querySelectorAll('.step');
  // 현재 활성화된 (visible class가 붙은) .grpahic-item을 지정
  let currentItem = graphicElems[0];
  let ioIndex;

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1;
  });

  // data-index 지정 for문
  for (let i = 0; i < stepElems.length; i++) {
    io.observe(stepElems[i]);

    stepElems[i].setAttribute('data-index', i);
    graphicElems[i].setAttribute('data-index', i);
    // stepElems[i].dataset.index = i;
    // graphicElems[i].dataset.index = i;

    // DOMelement.setAttribute()로 각 html element 속성값을 추가 및 변경 가능
  }

  function activate(action) {
    currentItem.classList.add('visible');
    if (action) {
      actions[action](true);
    }
  }
  function inactivate(action) {
    currentItem.classList.remove('visible');
    if (action) {
      actions[action](false);
    }
  }

  window.addEventListener('scroll', () => {
    let step;
    let boundingRect;

    // for (let i = 0; i < stepElems.length; i++) {

    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = stepElems[i];

      if (!step) continue;
      boundingRect = step.getBoundingClientRect();

      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        inactivate(currentItem.dataset.action);
        currentItem = graphicElems[step.dataset.index];
        activate(currentItem.dataset.action);
      }
      // else {
      //   graphicElems[step.dataset.index].classList.remove('visible');
      // }
    }
  });
  activate();
})();
