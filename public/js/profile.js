const newFormHandler = async (event) => {
  event.preventDefault();

  hideElementById('petAddError');

  // set petName variable and assign trimmed string
  const name = document.getElementById('pet-name').value.trim();

  // set petSpecies and assign dropdown menu value selected
  const dropdownSpecies = document.getElementById('pet-species');
  const species = dropdownSpecies.options[dropdownSpecies.selectedIndex].value;

  // set petBreed variable and assign trimmed string
  const breed = document.getElementById('pet-breed').value.trim();

  // set petSex and assign dropdown menu value selected
  const dropdownSex = document.getElementById('pet-sex');
  const sex = dropdownSex.options[dropdownSex.selectedIndex].value;

  // set petAge and assign dropdown menu value selected
  const dropdownAge = document.getElementById('pet-age');
  const age = dropdownAge.options[dropdownAge.selectedIndex].value;

  // set petSize and assign dropdown menu value selected
  const dropdownSize = document.getElementById('pet-size');
  const size = dropdownSize.options[dropdownSize.selectedIndex].value;

  // set petName variable and assign string set to lowercase
  let city = document.getElementById('pet-city').value.toLowerCase();

  if (name && species && breed && sex && age && size && image && city) {
    const response = await fetch(`/api/pets`, {
      method: 'POST',
      body: JSON.stringify({ name, species, breed, sex, age, size, image, city }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to add new pet');
    }
  } else {
    showElementById('petAddError');
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/pets/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete pet');
    }
  }
};

//utility function to show element by id
function showElementById(element) {
  document.getElementById(element).classList.remove('hidden');
}

//utility function to hide element by id
function hideElementById(element) {
  document.getElementById(element).classList.add('hidden');
}

// If any pets exist, add an event listener
let petList = document.getElementById('pet-list');
if (petList) {
  petList.addEventListener('click', delButtonHandler);
}

var myWidget = cloudinary.createUploadWidget({ cloudName: 'drrs0fxtr', uploadPreset: 'nuopjdut' }, (error, result) => {
  if (!error && result && result.event === 'success') {
    console.log('Done! Here is the image info: ', result.info);
  }
});
document.getElementById('upload_widget').addEventListener('click', function () {
  cloudinary.openUploadWidget(
    {
      cloudName: 'drrs0fxtr',
      uploadPreset: 'nuopjdut',
      showAdvancedOptions: true,
    },
    (error, result) => {
      let image = result.info.secure_url;
      console.log(image);
    }
  ),
    false;
});
// event handlers

document.getElementById('addPetBtn').addEventListener('click', newFormHandler);
