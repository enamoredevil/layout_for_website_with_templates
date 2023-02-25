window.addEventListener('DOMContentLoaded', () => {

    const body = document.body;

    
    // header menu

    const burgerButton = document.querySelector('.header__burger-btn-img'),
          headerLinks = document.querySelector('.header__links'),
          headerLinksInnerElements = Array.from(document.querySelectorAll('.header__links *'));


    const mobileButtons = document.querySelectorAll('.header__item'),
          dropdownMobile = document.querySelectorAll('.dropdown__mobile');


    
    burgerButton.addEventListener('click', () => {
        dropdownMobile.forEach(element => element.classList.remove('dropdown__mobile_opened'));
        headerLinks.classList.toggle('header__links_opened');
    });


    function closeBurgerMenu() {
      headerLinks.classList.remove('header__links_opened');
      dropdownMobile.forEach(element => element.classList.remove('dropdown__mobile_opened'));
    }


    window.addEventListener('scroll', () => {
      closeBurgerMenu();
    });


    window.addEventListener('click', event => {
      if (
        event.target === burgerButton 
        || event.target === headerLinks 
        || headerLinksInnerElements.includes(event.target)
        ) {
          ;
      } else {
        closeBurgerMenu();
      }
    });




    // swiper

    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,
      
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      
      });


      // dropdown menu 

      mobileButtons.forEach((button, i) => {
        button.addEventListener('click', () => {
          if (document.documentElement.clientWidth <= 1132) {
            dropdownMobile[i].classList.toggle('dropdown__mobile_opened');
            dropdownMobile.forEach(element => {
              if (element !== dropdownMobile[i]) {
                element.classList.remove('dropdown__mobile_opened');
              }
            });
          }
        });
      });


      // modal 

      const modalOpenButtons = document.querySelectorAll('[data-modal]'),
            modalCloseButton = document.querySelector('.modal__close-btn'),
            modal = document.querySelector('.modal'),
            modalForms = document.querySelectorAll('.modal__form'),
            warningMessages = document.querySelectorAll('.modal__warning');

      function openModal(event) {
        event.preventDefault();
        modal.classList.add('modal__opened');
        body.style.overflow = 'hidden';
      }

      function closeModal() {
        modal.classList.remove('modal__opened');
        body.style.overflow = '';
        modalForms.forEach(form => form.reset());
        setTimeout(changeModalToDefault, 600);
      }

      function changeModalToDefault () {
        thanksModal.style.display = '';
        loginContent.classList.remove('modal__content-login_opened');
        registerContent.classList.remove('modal__content-register_closed');
        passwordInputs.forEach(passwordInput => passwordInput.setAttribute('type', 'password'));
        warningMessages.forEach(warningMessage => warningMessage.style.display = 'none');
      }

      modalOpenButtons.forEach(button => {
        button.addEventListener('click', event => {
          openModal(event);
        });
      });


      modalCloseButton.addEventListener('click', closeModal);

      window.addEventListener('keydown', event => {
        if (event.code === "Escape") {
          if (headerLinks.classList.contains('header__links_opened')) {
            closeBurgerMenu();
          } else if (modal.classList.contains('modal__opened')) {
            closeModal()
          }
        }
      });

      window.addEventListener('click', event => {
        if (modal.classList.contains('modal__opened') && event.target === modal) {
          closeModal()
        }
      });

      // change register to login 


      const changeButtons = document.querySelectorAll('.modal__link'),
            loginContent = document.querySelector('.modal__content-login'),
            registerContent = document.querySelector('.modal__content-register');

      function changeModal(event) {
        event.preventDefault();
        loginContent.classList.toggle('modal__content-login_opened');
        registerContent.classList.toggle('modal__content-register_closed');
        modalForms.forEach(form => form.reset());

      }


      changeButtons.forEach(changeButton => {
        changeButton.addEventListener('click', event => {
          changeModal(event)
        });
      });


      // change input visibility 

      const visibilityButtons = document.querySelectorAll('.visibility__button'),
            passwordInputs = document.querySelectorAll('[data-password]'),
            emailInputs = document.querySelectorAll('[data-email]');


      visibilityButtons.forEach((visibilityButton, index) => {
        visibilityButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (passwordInputs[index].getAttribute('type') === 'password') {
              passwordInputs[index].setAttribute('type', 'text')
            } else {
              passwordInputs[index].setAttribute('type', 'password')
            }
        });
      });



      // thanks modal 


      const modalButtons = document.querySelectorAll('.modal__button'),
            thanksModal = document.querySelector('.modal__content-thanks')



      function showThanksModal(event, innerText) {
        event.preventDefault();
        loginContent.classList.remove('modal__content-login_opened');
        registerContent.classList.add('modal__content-register_closed');
        thanksModal.innerHTML = `<h2 class="thanks-modal__title">${innerText}</h2>`
        thanksModal.style.display = 'block';
        setTimeout(closeModal, 3000);
      }

      modalButtons.forEach((modalButton, index) => {
        modalButton.addEventListener('click', event => {
          event.preventDefault();
          if (emailInputs[index].value.trim() !== '' && passwordInputs[index].value.trim() !== '') {
            showThanksModal(event, "Thanks for testing the website");
          } else {
            warningMessages[index].style.display = 'block';
          }
        });
      });


      // questions form settings 

      const questionsNameInput = document.querySelector('[data-questions="name"]'),
            questionsEmailInput = document.querySelector('[data-questions="email"]'),
            questionsMessageInput = document.querySelector('[data-questions="message"]'),
            questionsButton = document.querySelector('.questions__button'),
            questionsForm = document.querySelector('.questions__form'),
            questionsWarningMessage = document.querySelector('.questions__warning-message');

      
      questionsButton.addEventListener('click', event => {
        event.preventDefault();

        if (questionsNameInput.value.trim() !== '' && questionsEmailInput.value.trim() !== '' && questionsMessageInput.value.trim() !== '') {
          questionsWarningMessage.style.display = '';
          openModal(event);
          showThanksModal(event, "Thanks! We'll call you as soon as possible");
          questionsForm.reset();
        } else {
          questionsWarningMessage.style.display = 'block';
        }
      });
      
});