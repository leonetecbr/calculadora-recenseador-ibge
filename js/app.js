const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
})

const quizBasic = $('#quiz-basic'), quizSample = $('#quiz-sample')
let darkMode = localStorage.getItem('prefer'), mode = true
if (darkMode !== null) darkMode = (darkMode === '1')

if ((window.matchMedia('(prefers-color-scheme: dark)').matches && !darkMode) || (darkMode !== null && !darkMode)){
    changeTheme(false)
}

let taxes = {
    1: {
        urban: {
            unit: 0.51,
            basic: {
                people: 0.90,
                quiz: 1.21
            },
            sample: {
                people: 1.51,
                quiz: 1.41
            }
        },
        rural: {
            unit: 0.56,
            basic: {
                people: 1.01,
                quiz: 1.34
            },
            sample: {
                people: 1.67,
                quiz: 1.57
            }
        }
    },
    2: {
        urban: {
            unit: 0.56,
            basic: {
                people: 1.01,
                quiz: 1.34
            },
            sample: {
                people: 1.67,
                quiz: 1.57
            }
        },
        rural: {
            unit: 0.62,
            basic: {
                people: 1.10,
                quiz: 1.46
            },
            sample: {
                people: 1.83,
                quiz: 1.70
            }
        }
    },
    3: {
        urban: {
            unit: 0.62,
            basic: {
                people: 1.10,
                quiz: 1.46
            },
            sample: {
                people: 1.83,
                quiz: 1.70
            }
        },
        rural: {
            unit: 0.69,
            basic: {
                people: 1.21,
                quiz: 1.61
            },
            sample: {
                people: 2.01,
                quiz: 1.89
            }
        }
    },
    4: {
        urban: {
            unit: 0.69,
            basic: {
                people: 1.21,
                quiz: 1.61
            },
            sample: {
                people: 2.01,
                quiz: 1.89
            }
        },
        rural: {
            unit: 0.75,
            basic: {
                people: 1.33,
                quiz: 1.76
            },
            sample: {
                people: 2.21,
                quiz: 2.07
            }
        }
    },
    5: {
        urban: {
            unit: 0.75,
            basic: {
                people: 1.33,
                quiz: 1.76
            },
            sample: {
                people: 2.21,
                quiz: 2.07
            }
        },
        rural: {
            unit: 0.82,
            basic: {
                people: 1.46,
                quiz: 1.94
            },
            sample: {
                people: 2.45,
                quiz: 2.28
            }
        }
    },
    6: {
        urban: {
            unit: 0.82,
            basic: {
                people: 1.46,
                quiz: 1.94
            },
            sample: {
                people: 2.45,
                quiz: 2.28
            }
        },
        rural: {
            unit: 0.90,
            basic: {
                people: 1.60,
                quiz: 2.14
            },
            sample: {
                people: 2.68,
                quiz: 2.51
            }
        }
    },
    7: {
        urban: {
            unit: 0.90,
            basic: {
                people: 1.60,
                quiz: 2.14
            },
            sample: {
                people: 2.68,
                quiz: 2.51
            }
        },
        rural: {
            unit: 1.00,
            basic: {
                people: 1.76,
                quiz: 2.36
            },
            sample: {
                people: 2.94,
                quiz: 2.76
            }
        }
    },
    8: {
        urban: {
            unit: 1.00,
            basic: {
                people: 1.94,
                quiz: 2.60
            },
            sample: {
                people: 3.25,
                quiz: 3.03
            }
        },
        rural: {
            unit: 1.11,
            basic: {
                people: 2.01,
                quiz: 2.67
            },
            sample: {
                people: 3.32,
                quiz: 3.10
            }
        }
    },
    9: {
        urban: {
            unit: 1.19,
            basic: {
                people: 2.33,
                quiz: 3.12
            },
            sample: {
                people: 3.90,
                quiz: 3.64
            }
        },
        rural: {
            unit: 1.33,
            basic: {
                people: 2.42,
                quiz: 3.20
            },
            sample: {
                people: 3.98,
                quiz: 3.72
            }
        }
    },
    10: {
        urban: {
            unit: 1.31,
            basic: {
                people: 2.56,
                quiz: 3.43
            },
            sample: {
                people: 4.29,
                quiz: 4.00
            }
        },
        rural: {
            unit: 1.46,
            basic: {
                people: 2.66,
                quiz: 3.52
            },
            sample: {
                people: 4.38,
                quiz: 4.09
            }
        }
    },
    11: {
        urban: {
            unit: 1.44,
            basic: {
                people: 2.82,
                quiz: 3.77
            },
            sample: {
                people: 4.72,
                quiz: 4.40
            }
        },
        rural: {
            unit: 1.61,
            basic: {
                people: 2.93,
                quiz: 3.87
            },
            sample: {
                people: 4.82,
                quiz: 4.50
            }
        }
    },
}

$('#calculator').on('submit', function (e) {
    e.preventDefault()
    if (!this.checkValidity()) {
        e.stopPropagation()
    } else {
        let sons = $('#number-sons').val(), family = 0, income = 0, inss, irrf
        let taxe = $('input[name="taxe"]:checked').val(), value = {}
        const locale = $('input[name="locale"]:checked').val()
        let units = parseInt($('#units-confirmed').val()) + parseInt($('#units-included').val())
        const quiz = {
            basic: parseInt(quizBasic.val()),
            sample: parseInt($('#quiz-sample').val())
        }
        const people = {
            basic: parseInt($('#people-basic').val()),
            sample: parseInt($('#people-sample').val())
        }

        taxe = taxes[taxe][locale]

        value.units = units * taxe.unit
        value.quiz =  quiz.basic * taxe.basic.quiz + quiz.sample * taxe.sample.quiz
        value.people = people.basic * taxe.basic.people + people.sample * taxe.sample.people

        income += value.units + value.quiz + value.people

        $('#units').html(units)
        $('#quiz').html(quiz.basic + quiz.sample)
        $('#people').html(people.basic + people.sample)

        $('#units-value').html(currency(value.units))
        $('#quiz-value').html(currency(value.quiz))
        $('#people-value').html(currency(value.people))

        if (income <= 1655.98 && income > 0){
            $('#quantity-sons').html(sons)
            family = sons * 56.47
        } else $('#family-salary').html('Salário fora da faixa contemplada!')

        $('#family-salary-value').html(currency(family))

        inss = calcINSS(income)

        $('#percent-inss').html(inss.taxe.toLocaleString('pt-br'))
        $('#inss-value').html(currency(inss.discount))

        income += inss.discount

        irrf = calcIRRF(income)

        $('#percent-irrf').html(irrf.taxe.toLocaleString('pt-br'))
        $('#irrf-value').html(currency(irrf.discount))

        income += irrf.discount
        income += family

        $('#income-value').html(currency(income))
        $('#income').removeClass('d-none')

        window.location.href = '#income'
    }

    $(this).addClass('was-validated')

    $('#calculate-btn').html('Atualizar')
})

$('#change-mode').on('click', () => {
    changeTheme()
})

quizBasic.on('change', () => (quizBasic.val() === '0')?$('#people-basic').val('0'):'')

quizSample.on('change', () => (quizSample.val() === '0')?$('#people-sample').val('0'):'')

function currency(number){
    return number.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
}

function calcINSS(income){
    let inss = {taxe: 14, discount: 0}

    if (income <= 1212) inss.taxe = 7.5
    else if (income <= 2427.35){
        inss.taxe = 9
        inss.discount = 18.18
    }
    else if (income <= 3641.03){
        inss.taxe = 12
        inss.discount = 91.01
    }
    else if (income <= 7087.22){
        inss.taxe = 14
        inss.discount = 163
    }
    else inss.discount =  163 - 7087.22 * 0.14

    if (income <= 7087.22) inss.discount -= income / 100 * inss.taxe

    return inss
}

function calcIRRF(income){
    let irrf = {taxe: 0, discount: 0}

    if (income <= 1903.98) irrf.taxe = 0
    else if (income <= 2826.65){
        irrf.taxe = 7.5
        irrf.discount = 142.80
    }
    else if(income <= 3751.05){
        irrf.taxe = 15
        irrf.discount = 354.80
    }
    else if(income <= 4664.68){
        irrf.taxe = 22.5
        irrf.discount = 636.13
    }
    else{
        irrf.taxe = 27.5
        irrf.discount = 869.36
    }

    irrf.discount -= income / 100 * irrf.taxe

    return irrf
}

function changeTheme(click = true){
    mode = !mode
    if (mode) {
        $('.form-control').addClass('form-control-dark')
        $('.form-check-input').addClass('form-check-dark')
        $('body').addClass('bg-black').addClass('text-gray').removeClass('bg-light')
        $('.shadow-sm').addClass('bg-dark').removeClass('bg-white')
        $('.list-group-item').addClass('bg-dark').addClass('text-gray')
        $('#income').addClass('text-gray')
        $('.btn').addClass('btn-dark').removeClass('btn-secondary')
        $('.dark-mode').addClass('bg-dark')
        $('.bg-change').removeClass('bg-white')
        $('.bi-moon').addClass('bi-sun').removeClass('bi-moon')
        if (click) localStorage.setItem('prefer', '1')
    } else{
        $('.form-control').removeClass('form-control-dark')
        $('.form-check-input').removeClass('form-check-dark')
        $('body').removeClass('bg-black').removeClass('text-gray').addClass('bg-light')
        $('.shadow-sm').removeClass('bg-dark').addClass('bg-white')
        $('.list-group-item').removeClass('bg-dark').removeClass('text-gray')
        $('#income').removeClass('text-gray')
        $('.btn').removeClass('btn-dark').addClass('btn-secondary')
        $('.dark-mode').removeClass('bg-dark')
        $('.bg-change').addClass('bg-white')
        $('.bi-sun').addClass('bi-moon').removeClass('bi-sun')
        if (click) localStorage.setItem('prefer', '0')
    }
}