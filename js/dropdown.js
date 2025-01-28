const dropdownContent = document.getElementById('dropdown-content');
const pricingDropdownContent = document.getElementById('pricing-dropdown-content');

    function displayDropdown() {
      if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'none';
      } else {
        dropdownContent.style.display = 'block';
      }
    }

    const displayPricingDropdown = () => {
      if (pricingDropdownContent.style.display === 'block') {
        pricingDropdownContent.style.display = 'none';
      } else {
        pricingDropdownContent.style.display = 'block';
      }
    }