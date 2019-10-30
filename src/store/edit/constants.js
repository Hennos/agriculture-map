const events = Object.freeze({
  createObject: '@@EDIT:CREATE_OBJECT',
  changeObjects: '@@EDIT:CHANGE_OBJECTS',
  removeObjects: '@@EDIT:REMOVE_OBJECTS',

  successPostData: '@@EDIT:SUCCESS_POST_DATA',
  errorPostData: '@@EDIT:ERROR_POST_DATA'
});

export { events };
