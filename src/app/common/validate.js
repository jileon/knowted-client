const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const validateFirstName = name => {
  if (!name.trim()) throw new Error('Please enter your name');
  if (name.length < 2) throw new Error('Your name must be a little longer');
  if (name.length > 32)
    throw new Error('Have a nickname? The max name length is 32 characters');
  if (!/^\D+$/.test(name)) throw new Error("Names can't have numbers, silly! ");
};

export const validateEmail = email => {
  if (!email.trim()) throw new Error('Please enter your email');
  if (!validEmail.test(email)) throw new Error('Please enter a valid email');
};

export const validatePassword = password => {
  if (!password.trim()) throw new Error('Please enter your password');
  if (password.length < 8)
    throw new Error('Try entering a password at least 8 characters');
  if (password.length > 72)
    throw new Error(
      'Have a shorter one? The max password length is 72 characters'
    );
  if (password[0] === ' ')
    throw new Error('Please enter a password without spaces at the beginning');
  if (password[password.length - 1] === ' ')
    throw new Error('Please enter a password without spaces at the end');
};
