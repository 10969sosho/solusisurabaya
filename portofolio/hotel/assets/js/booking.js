(function () {
    'use strict';

    var bookingForm = document.getElementById('bookingForm');
    var heroBookingForm = document.getElementById('heroBookingForm');
    var bookingModal = document.getElementById('bookingModal');
    var modalClose = document.getElementById('modalClose');
    var modalOverlay = bookingModal ? bookingModal.querySelector('.booking-modal-overlay') : null;
    var successPopup = document.getElementById('bookingSuccessPopup');

    function showSuccessPopup() {
        if (!successPopup) return;
        successPopup.classList.add('show');
        setTimeout(function () {
            successPopup.classList.remove('show');
        }, 4000);
    }

    function showBookingModal() {
        if (!bookingModal) return;
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hideBookingModal() {
        if (!bookingModal) return;
        bookingModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', hideBookingModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', hideBookingModal);
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && bookingModal && bookingModal.classList.contains('active')) {
            hideBookingModal();
        }
    });

    if (heroBookingForm) {
        heroBookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var checkIn = document.getElementById('checkIn');
            var checkOut = document.getElementById('checkOut');
            var guests = document.getElementById('guests');

            if (bookingModal) {
                showBookingModal();
                var modalInputs = bookingModal.querySelectorAll('input[type="date"], select');
                if (modalInputs[0] && checkIn) modalInputs[0].value = checkIn.value;
                if (modalInputs[1] && checkOut) modalInputs[1].value = checkOut.value;
                if (modalInputs[2] && guests) modalInputs[2].value = guests.value;
            } else {
                window.location.href = 'contact.html#booking';
            }
        });
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var nameInput = this.querySelector('input[type="text"]');
            var emailInput = this.querySelector('input[type="email"]');
            if (nameInput && emailInput && nameInput.value.trim() && emailInput.value.trim()) {
                showSuccessPopup();
                this.reset();
            }
        });
    }

    /* ===== DATE VALIDATION ===== */
    var checkInInput = document.getElementById('checkIn');
    var checkOutInput = document.getElementById('checkOut');

    if (checkInInput && checkOutInput) {
        checkInInput.addEventListener('change', function () {
            checkOutInput.min = this.value;
            if (checkOutInput.value < this.value) {
                checkOutInput.value = this.value;
            }
        });
    }
})();
