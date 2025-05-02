@extends('master')

@section('content')
    <div class="row">
        <div class="col-12">
            <label for="getCountry" class="form-label">Select Country</label>
            <select id="getCountry" class="form-select" name="getCountry" onchange="getFinancialYear(this.value)">
                <option value="" selected>Choose...</option>
                <option value="GB"> UK </option>
                <option value="IE">Ireland</option>
            </select>
        </div>

        <div class="col-12 mt-5 d-none" id="financialYearContainer">
            <label for="getYear" class="form-label">Select Financial Year</label>
            <select id="getYear" class="form-select" name="getYear" onchange="getHolidaysList(this.value)">

            </select>
        </div>

        <div id="holidaysList" class="d-none mt-5">

        </div>
    </div>
@endsection

@push('custom-scripts')
    <script src="{{ asset('assets/js/financial-year.js') }}"></script>
    <script src="{{ asset('assets/js/holiday-list.js') }}"></script>
@endpush
