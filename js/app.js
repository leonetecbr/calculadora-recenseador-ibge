const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

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

$('#calculator').on('submit', function (e) { // Realiza o cálculo da remuneração
    e.preventDefault()
    if (!this.checkValidity()) {
        e.stopPropagation()
    } else {
        let sons = $('#number-sons').val(), family = 0, inss = {taxe: 14, discount: 0}, irrf = {taxe: 0, discount: 0}
        let taxe = $('input[name="taxe"]:checked').val(), value = {}
        const locale = $('input[name="locale"]:checked').val()
        let units = parseInt($('#units-confirmed').val()) + parseInt($('#units-changed').val()), income = 0
        units +=  parseInt($('#units-included').val())
        const quiz = {
            basic: parseInt($('#quiz-basic').val()),
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
        $('#units-value').html(value.units.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}))
        $('#quiz-value').html(value.quiz.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}))
        $('#people-value').html(value.people.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}))

        if (income <= 1655.98 && income > 0){
            $('#quantity-sons').html(sons)
            family = sons * 56.47
        } else $('#family-salary').html('Salário fora da faixa contemplada!')
        $('#family-salary-value').html(family.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}))

        if (income <= 1212) inss.taxe = 7.5
        else if (income <= 2427.35) inss.taxe = 9
        else if (income <= 3641.03) inss.taxe = 12
        else if (income <= 7087.22) inss.taxe = 14
        else inss.discount = 7087.22 / 100 * 14
        if (inss.discount === 0) inss.discount -= income / 100 * inss.taxe

        $('#percent-inss').html(inss.taxe.toLocaleString('pt-br'))
        $('#inss-value').html(inss.discount.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}))

        income += inss.discount

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

        $('#percent-irrf').html(irrf.taxe.toLocaleString('pt-br'))
        $('#irrf-value').html(irrf.discount.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}))

        income += irrf.discount
        income += family

        $('#income-value').html(income.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}))
        $('#income').removeClass('d-none')
        window.location.href = '#income'
    }

    $(this).addClass('was-validated')
})