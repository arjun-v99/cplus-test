function getFinancialYear(countryName) {
    if (countryName) {
        const currentYear = new Date().getFullYear();

        // 10 years ago
        var yearsLimit = currentYear - 10;

        // getting select id to create options
        var select = document.getElementById("getYear");
        // Removing options if it already exists
        let options = select.getElementsByTagName("option");
        for (var i = options.length; i--; ) {
            select.removeChild(options[i]);
        }

        // Creating Dummy FY tag selector
        var opt = document.createElement("option");
        opt.value = "";
        opt.innerHTML = "Choose...";
        select.appendChild(opt);

        if (countryName === "IE") {
            // Looping till we get 10 Years ago
            for (let i = currentYear; i >= yearsLimit; i--) {
                var opt = document.createElement("option");
                opt.value = i;
                opt.innerHTML = i;
                select.appendChild(opt);
            }
        } else {
            for (let i = currentYear; i >= yearsLimit; i--) {
                var opt = document.createElement("option");
                opt.value = i;
                // Since UK Financial Year spans across two calender years we are changing innerText of years
                let nextYear = i + 1;
                opt.innerHTML = i + "-" + nextYear;
                select.appendChild(opt);
            }
        }

        // Displaying Financial Year Container
        document
            .getElementById("financialYearContainer")
            .classList.remove("d-none");
    } else {
        // Hiding Financial Year Container
        document
            .getElementById("financialYearContainer")
            .classList.add("d-none");
    }
}
