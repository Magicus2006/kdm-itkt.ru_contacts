class AventosCalculator {
    constructor(functionResult, currencyRate) {
        //this.currency = 140.00
        this.initialData = { plotnostSel: 780,
            thickness: 16,
            handleWeightClass: 0,
            heightFacadeInput: 370,
            widthFacadeInput: 800,
            openingType: false,
            currency: 0,
            discountOne: 0,
            discountTwo: 0}

        this.currencyRate = currencyRate
        this.functionResult = functionResult
        let plotnostSel = document.getElementsByClassName("plotnostSel")[0]
        let thickness = document.getElementsByClassName("thickness")[0]
        let handleWeightClass = document.getElementsByClassName("handleWeightClass")[0]
        let heightFacadeInput = document.getElementsByClassName("heightFacadeInput")[0]
        let widthFacadeInput = document.getElementsByClassName("widthFacadeInput")[0]
        let openingType = document.getElementsByClassName("openingType")[0]
        let currency = document.getElementsByClassName("currency")[0]

        plotnostSel.addEventListener('change', this)
        thickness.addEventListener('change', this)
        handleWeightClass.addEventListener('change', this)
        heightFacadeInput.addEventListener('change', this)
        widthFacadeInput.addEventListener('change', this)
        openingType.addEventListener('change', this)
        //currency.addEventListener('change', this)

        this.initialData["plotnostSel"] = parseFloat(plotnostSel.value)
        thickness.value = this.initialData["thickness"]
        widthFacadeInput.value = this.initialData["widthFacadeInput"]
        heightFacadeInput.value = this.initialData["heightFacadeInput"]
        this.calculation()
    }

    handleEvent(event) {
        this.initialData[event.target.className] = parseFloat(event.target.value)
        if(event.target.className == "openingType") {
            if (event.target.value == 0) {
                this.initialData[event.target.className] = false
            } else {
                this.initialData[event.target.className] = true
            }
        }
        this.calculation()
    }

    calculationAvetos() {
        var facadeWeight = ((this.initialData["thickness"]/1000)*
                (this.initialData["widthFacadeInput"]/1000)*
                (this.initialData["heightFacadeInput"]/1000)*this.initialData["plotnostSel"])+
            this.initialData["handleWeightClass"]
        var powerFactor = facadeWeight * this.initialData["heightFacadeInput"]

        this.initialData["facadeWeight"] = facadeWeight
        this.initialData["powerFactor"] = powerFactor

        // Выводим результат
        var facadeWeightSpan = document.getElementsByClassName("facadeWeight")[0]
        var powerFactorSpan = document.getElementsByClassName("powerFactor")[0]
        powerFactorSpan.textContent = powerFactor.toFixed(0)
        facadeWeightSpan.textContent = facadeWeight.toFixed(2)
    }

    calculation() {
        this.calculationAvetos()
        this.setRequest()
    }

    showResult() {
        const rate = this.currencyRate[this.initialData["currency"]]
        const discountOne = this.initialData["discountOne"]
        const discountTwo = this.initialData["discountTwo"]

        this.initialData["data"] = this.currencyCost(this.initialData["data"], rate) // Расчет валюты
        this.initialData["data"] = this.discount(this.initialData["data"], discountOne, discountTwo)

        eval(this.functionResult)(this.initialData["data"], this.initialData["openingType"])
        //CreateTableToAventosKits2(this.initialData["data"], this.initialData["openingType"])

    }

    async ajaxRequest(url) {

        var data_post = { "handleWeight": this.initialData["handleWeightClass"],
            "height": this.initialData["heightFacadeInput"],
            "thickness": this.initialData["thickness"],
            "width": this.initialData["widthFacadeInput"],
            "density": this.initialData["plotnostSel"] };

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data_post), // данные могут быть 'строкой' или {объектом}!
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        this.initialData["data"] = json
        this.showResult()

    }



    currencyCost(data, rate=1) {
        for(var key in data) {
            for (var key1 in data[key]) {
                for (var key2 in data[key][key1]) {
                    for (var key3 in data[key][key1][key2]) {
                        if(key3 == "cost") {
                            data[key][key1][key2][key3] *= rate
                        }
                    }
                }
            }
        }
        return data
    }

    setRequest() {
        let url = "http://util.kdm-itkt.ru/l/"
        //let url = "http://127.0.0.1:8000/l/"
        this.ajaxRequest(url)
    }

    discount(data, one, two) {
        for(var key in data) {
            for (var key1 in data[key]) {
                for (var key2 in data[key][key1]) {
                    for (var key3 in data[key][key1][key2]) {
                        if(key3 == "cost") {
                            data[key][key1][key2][key3] = data[key][key1][key2][key3] - data[key][key1][key2][key3] * one / 100
                            data[key][key1][key2][key3] = data[key][key1][key2][key3] - data[key][key1][key2][key3] * two / 100
                        }
                    }
                }
            }
        }
        return data
    }
    setDiscount(one, two) {
        this.initialData["discountOne"] = one
        this.initialData["discountTwo"] = two
        this.setRequest()
    }
}