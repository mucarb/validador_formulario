let Validator = {
    handleSubmit: (event) => {
        event.preventDefault();

        let send = true;
        let inputs = form.querySelectorAll('input');

        Validator.clearErrors();

        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = Validator.checkInput(input);

            if (check !== true) {
                send = false;
                Validator.showError(input, check);
            }
        }

        if (send) {
            form.submit();
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            rules = rules.split('|');
            for (let r in rules) {
                let ruleDetails = rules[r].split('=');

                switch (ruleDetails[0]) {
                    case 'required':
                        if (input.value == '') {
                            return 'Esse campo é obrigatório';
                        }
                        break;
                    case 'min':
                        if (input.value.length < ruleDetails[1]) {
                            return 'Campo deve ter no mínimo ' + ruleDetails[1] + ' caracteres';
                        }
                        break;
                    case 'email':
                        if (input.value !== '') {
                            const regex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/;

                            if (!regex.test(input.value.toLowerCase())) {
                                return 'E-mail informado não é válido';
                            }
                        }
                        break;
                }
            }
        }

        return true;
    },
    showError: (input, error) => {
        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors: () => {
        let inputs = form.querySelectorAll('input');

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');

        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.validator');

form.addEventListener('submit', Validator.handleSubmit);