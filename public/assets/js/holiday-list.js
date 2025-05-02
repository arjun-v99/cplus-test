function getHolidaysList(yearName) {
    var getCountryName = document.getElementById("getCountry").value;

    if (getCountryName) {
        var getSelectedYear = document.getElementById("getYear").value;
        // Getting Div id to display holidays list when fetching holidays list is complete
        var holidayListContainer = document.getElementById("holidaysList");
        const pTags = holidayListContainer.querySelectorAll("p");
        pTags.forEach((p) => {
            p.remove();
        });

        // Since IE financial only spans across a calender year
        if (getCountryName === "IE") {
            $.ajax({
                url:
                    "https://date.nager.at/api/v3/PublicHolidays/" +
                    getSelectedYear +
                    "/" +
                    getCountryName,
                method: "GET",
                success: function (data) {
                    data.forEach(function (holiday) {
                        const d = new Date(holiday.date);
                        const day = d.getDay(); // 0 = Sunday, 6 = Saturday

                        if (day !== 0 && day !== 6) {
                            // Creating a p tag and appending results to the main container
                            const para = document.createElement("p");
                            const node = document.createTextNode(
                                holiday.date + " - " + holiday.localName
                            );
                            para.appendChild(node);
                            holidayListContainer.appendChild(para);
                        }
                    });
                    // Displaying holiday list
                    holidayListContainer.classList.remove("d-none");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error(
                        "Error fetching holidays:",
                        textStatus,
                        errorThrown
                    );
                    // hiding holiday list
                    holidayListContainer.classList.add("d-none");
                },
            });
        } else {
            let fyStart = new Date(getSelectedYear, 3, 6); //April 6th of the selected starting year

            let fyEnd = new Date(getSelectedYear + 1, 3, 5); //April 5th of the following year

            let precedingYear = parseInt(getSelectedYear) + 1;

            // Creating URLs for FY-Start and FY-End
            fyURLs = [
                "https://date.nager.at/api/v3/PublicHolidays/" +
                    getSelectedYear +
                    "/" +
                    getCountryName,
                "https://date.nager.at/api/v3/PublicHolidays/" +
                    precedingYear +
                    "/" +
                    getCountryName,
            ];

            $.when($.getJSON(fyURLs[0]), $.getJSON(fyURLs[1])).done(
                /**@data1 contains responses from first URL with additional message such as request status in second index(i.e, 1)
                 * @data2 contains responses from first URL with additional message such as request status in second index(i.e, 1)
                 * */
                function (data1, data2) {
                    // Using spread operator to combine two response values from the two URLS into a single array
                    const fyHolidays = [...data1[0], ...data2[0]];

                    // Filter by financial year and exclude weekends
                    const filtered = fyHolidays.filter((h) => {
                        const d = new Date(h.date);
                        const day = d.getDay(); // 0 = Sunday, 6 = Saturday
                        return (
                            d >= fyStart && d <= fyEnd && day !== 0 && day !== 6
                        );
                    });

                    if (filtered !== 0) {
                        filtered.forEach(function (holiday) {
                            // Creating a p tag and appending results to the main container
                            const para = document.createElement("p");
                            const node = document.createTextNode(
                                holiday.date + " - " + holiday.localName
                            );
                            para.appendChild(node);
                            holidayListContainer.appendChild(para);
                        });
                    }

                    // Displaying holiday list
                    holidayListContainer.classList.remove("d-none");
                }
            );
        }
    }
}
