const FormValidator = {
  validateUsername: (username) => {
    const minLength = 5;
    const maxLength = 20;

    //check for length of the provided username
    if (username.length < minLength || username.length > maxLength) {
      return false;
    }

    // check if it is alpha numeric with exception of "_"
    const validCharacters = /^[a-zA-Z0-9_]+$/;
    return validCharacters.test(username);
  },

  validatePassword: (password) => {
    const minLength = 6;
    const maxLength = 20;

    //check for the length of password
    if (password.length < minLength || password.length > maxLength) {
      return false;
    }

    // check if the password contains at least one special character
    const containsSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(
      password
    );
    return containsSpecialCharacter;
  },

  validateEmail: (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //test the provided email on the email pattern
    return emailPattern.test(email);
  },
};

module.exports = FormValidator;
