let darkMode = localStorage.getItem('prefer'), mode = true
if (darkMode !== null) darkMode = (darkMode === '1')

if ((window.matchMedia('(prefers-color-scheme: dark)').matches && !darkMode) || (darkMode !== null && !darkMode)) {
    changeTheme(false)
}

if ('serviceWorker' in navigator) navigator.serviceWorker.register('/apps/ibge/sw.js')

const quizBasic = $('#quizBasic'), quizSample = $('#quizSample'), tabLink = $('.tab-link'), formTax = $('#taxForm')
const formIncome = $('#incomeForm'), formTermination = $('#terminationForm'), formAbsence = $('#absenceForm')

const currency = (number) => number.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})

const taxes = {
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

tabLink.on('hide.bs.tab', function () {
    if (mode) $(this).removeClass('bg-dark')
    else $(this).removeClass('bg-white')
})

tabLink.on('show.bs.tab', function () {
    if (mode) $(this).addClass('bg-dark')
    else $(this).addClass('bg-white')
})

new bootstrap.Tab($('#btnCalcIncome')).show()

quizBasic.on('change', () => (quizBasic.val() === '0') ? $('#peopleBasic').val('0') : '')

quizSample.on('change', () => (quizSample.val() === '0') ? $('#peopleSample').val('0') : '')

formIncome.on('submit', function (e) {
    e.preventDefault()

    if (!this.checkValidity()) {
        e.stopPropagation()
    } else {
        const data = Object.fromEntries(formIncome.serializeArray().map(({name, value}) => [name, value]))
        let family = 0, income = 0, inss, irrf, taxe = data.taxe, value = {}
        const locale = data.locale, sons = data.number_sons, outRangeSalary = $('#outRangeSalary')
        const units = parseInt(data.units_confirmed) + parseInt(data.units_included)
        const quantitySons = $('#quantitySons')
        const quiz = {
            basic: parseInt(data.quiz_basic),
            sample: parseInt(data.quiz_sample)
        }

        const people = {
            basic: parseInt(data.people_basic),
            sample: parseInt(data.people_sample)
        }

        quantitySons.removeClass('d-none')
        outRangeSalary.addClass('d-none')

        taxe = taxes[taxe][locale]

        value.units = units * taxe.unit
        value.quiz =  quiz.basic * taxe.basic.quiz + quiz.sample * taxe.sample.quiz
        value.people = people.basic * taxe.basic.people + people.sample * taxe.sample.people

        income += value.units + value.quiz + value.people

        $('#units').html(units)
        $('#quiz').html(quiz.basic + quiz.sample)
        $('#people').html(people.basic + people.sample)

        $('#unitsValue').html(currency(value.units))
        $('#quizValue').html(currency(value.quiz))
        $('#peopleValue').html(currency(value.people))
        $('#totalGross').html(currency(income))

        if (income <= 1655.98 && income > 0){
            $('#quantitySonsValue').html(sons)
            family = sons * 56.47
        } else{
            quantitySons.addClass('d-none')
            outRangeSalary.removeClass('d-none')
        }

        $('#familySalaryValue').html(currency(family))

        inss = calcINSS(income)

        $('#percentInss').html(inss.taxe.toLocaleString('pt-br'))
        $('#inssValue').html(currency(inss.discount))

        income += inss.discount

        irrf = calcIRRF(income)

        $('#percentIrrf').html(irrf.taxe.toLocaleString('pt-br'))
        $('#irrfValue').html(currency(irrf.discount))

        income += irrf.discount
        income += family

        $('#incomeValue').html(currency(income))
        $('#income').removeClass('d-none')

        window.location.href = '#income'
        $('#calculateBtn').html('Atualizar')
    }

    formIncome.addClass('was-validated')
})

formTax.on('submit', function (e) {
    e.preventDefault()

    const success = $('#calcTaxSuccess'), error = $('#calcTaxError')

    success.addClass('d-none')
    error.addClass('d-none')

    if (!this.checkValidity()) {
        e.stopPropagation()
    } else {
        const data = Object.fromEntries(formTax.serializeArray().map(({name, value}) => [name, value]))
        const value = parseFloat(data.value_units), locale = data.tax_locale
        const units = parseInt(data.units_visited), valueUnit = parseFloat((value / units).toFixed(2))
        let taxe = 0

        for (let i = 1; i <= 11; i++) {
            if (taxes[i][locale].unit === valueUnit) taxe = i
        }

        if  (taxe !== 0) {
            $('#taxValue').html(taxe)
            success.removeClass('d-none')
        } else error.removeClass('d-none')

        $('#calculateTaxBtn').html('Atualizar')
    }

    formTax.addClass('was-validated')
})

formAbsence.on('submit', function (e) {
    e.preventDefault()

    if (!this.checkValidity()) {
        e.stopPropagation()
    } else {
        const data = Object.fromEntries(formAbsence.serializeArray().map(({name, value}) => [name, value]))
        const domicile = parseInt(data.domicile_occupied)
        let absence = {
            quantity: domicile - parseInt(data.quiz_finalized),
            taxe: null
        }

        let goals = {
            taxe: parseInt(data.goal_absence),
            quantity: null
        }

        goals.quantity = domicile * goals.taxe / 100

        absence.taxe = parseFloat((absence.quantity / domicile * 100).toFixed())

        const diff = absence.quantity - goals.quantity

        $('#absenceQuantity').html(absence.quantity)
        $('#absenceTaxe').html(absence.taxe.toLocaleString('pt-br'))
        $('#goalAbsenceQuantity').html(goals.quantity.toLocaleString('pt-br'))
        $('#goalAbsenceDiff').html((diff > 0) ? Math.ceil(diff) : 0)
        $('#absenceDetails').removeClass('d-none')

        window.location.href = '#absenceDetails'
        $('#calculateAbsenceBtn').html('Atualizar')
    }

    formAbsence.addClass('was-validated')
})

formTermination.on('submit', function (e) {
    e.preventDefault()

    if (!this.checkValidity()) {
        e.stopPropagation()
    } else {
        const calcError = $('#calcTerminationError'), incomeTermination = $('#incomeTermination')
        calcError.addClass('d-none')

        const data = Object.fromEntries(formTermination.serializeArray().map(({name, value}) => [name, value]))
        const start = new Date(data.start_day), end = new Date(data.end_day)
        const diffInMs = end - start
        const daysWorked = diffInMs / (1000 * 60 * 60 * 24)

        $('#calculateTerminationBtn').html('Atualizar')

        if (daysWorked < 15){
            calcError.removeClass('d-none')
            incomeTermination.addClass('d-none')
            return false
        }

        const monthsWorked = (daysWorked % 30 >= 15) ? Math.floor(daysWorked / 30) + 1 : Math.floor(daysWorked / 30)

        const salary = parseFloat((parseFloat(data.income_total) / daysWorked * 30).toFixed(2))

        const vacation = salary * (monthsWorked / 12)
        const vacationBonus = parseFloat((vacation / 3).toFixed(2))
        const christmasBonus = vacation
        let total = vacation + vacationBonus + christmasBonus

        $('#salary').html(currency(salary))
        $('#christmasBonus').html(currency(christmasBonus))

        const inss = calcINSS(christmasBonus)
        const irrf = calcIRRF(christmasBonus - inss.discount)
        total += inss.discount - irrf.discount

        $('#daysWorked').html(daysWorked + ' dias')
        $('#vacation').html(currency(vacation))
        $('#vacationBonus').html(currency(vacationBonus))
        $('#incomeTerminationTotal').html(currency(total))
        $('#percentInssTermination').html(inss.taxe.toLocaleString('pt-br'))
        $('#inssTermination').html(currency(inss.discount))
        $('#percentIrrfTermination').html(irrf.taxe.toLocaleString('pt-br'))
        $('#irrfTermination').html(currency(irrf.discount))
        incomeTermination.removeClass('d-none')

        window.location.href = '#incomeTermination'
    }

    formTermination.addClass('was-validated')
})

$('#changeMode').on('click', changeTheme)

$('[data-bs-toggle="tooltip"]').toArray().map(tooltipTrigger => new bootstrap.Tooltip(tooltipTrigger))

function calcINSS(income) {
    let inss = {taxe: 14, discount: 0}

    if (income <= 1212) inss.taxe = 7.5
    else if (income <= 2427.35) {
        inss.taxe = 9
        inss.discount = 18.18
    } else if (income <= 3641.03) {
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
        $('.income').addClass('text-gray')
        $('.btn').addClass('btn-dark').removeClass('btn-secondary')
        $('.dark-mode').addClass('bg-dark')
        $('.bg-change').removeClass('bg-white')
        $('.bi-moon').addClass('bi-sun').removeClass('bi-moon')
        $('.input-group-text').addClass('input-group-text-dark')
        $('.nav-tabs').addClass('bg-black').removeClass('bg-light')
        $('.nav-tabs a').addClass('text-light').removeClass('text-black')
        $('.nav-tabs a.bg-white').addClass('bg-dark').removeClass('bg-white')
        if (click) localStorage.setItem('prefer', '1')
    } else{
        $('.form-control').removeClass('form-control-dark')
        $('.form-check-input').removeClass('form-check-dark')
        $('body').removeClass('bg-black').removeClass('text-gray').addClass('bg-light')
        $('.shadow-sm').removeClass('bg-dark').addClass('bg-white')
        $('.list-group-item').removeClass('bg-dark').removeClass('text-gray')
        $('.income').removeClass('text-gray')
        $('.btn').removeClass('btn-dark').addClass('btn-secondary')
        $('.dark-mode').removeClass('bg-dark')
        $('.bg-change').addClass('bg-white')
        $('.bi-sun').addClass('bi-moon').removeClass('bi-sun')
        $('.input-group-text').removeClass('input-group-text-dark')
        $('.nav-tabs').removeClass('bg-black').addClass('bg-light')
        $('.nav-tabs a').removeClass('text-light').addClass('text-black')
        $('.nav-tabs a.bg-dark').removeClass('bg-dark').addClass('bg-white')
        if (click) localStorage.setItem('prefer', '0')
    }
}