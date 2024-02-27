import ApiService from './api.service';

// Constant
const baseUrl = 'users';

const UserService = {
  getAllUsers() {
    return ApiService.get(baseUrl);
  },

  deleteUserByName(params) {
    return ApiService.delete(`${baseUrl}/${params}`);
  },

  /**
   * Create a new user
   * @param {Object} params new user infos
   * @returns response object
   */
  createUser(params) {
    return ApiService.post(`${baseUrl}/create`, params);
  },
  // /**
  //  * Start detection server for a specific user
  //  * @param {Params} params
  //  * @returns {Response} response
  //  */
  // loadModel(params) {
  // 	return ApiService.get(baseUrl + 'start', params);
  // },
  // /**
  //  * Stop detection server for a specific user
  //  * @param {Params} params
  //  * @returns {Response} response
  //  */
  // unloadModel(params) {
  // 	return ApiService.get(baseUrl + 'stop', params);
  // },
  // /**
  //  * Run image through detection server of specific user
  //  * @param {Params} params
  //  * @returns {Response} response
  //  */
  // detect(params) {
  // 	return ApiService.get(baseUrl + 'run', params);
  // },
  // /**
  //  * Retrieve detected image from a specific user folder path
  //  * @param {Params} params
  //  * @returns {Response} response
  //  */
  // retrieveDetectedImage(params) {
  // 	return ApiService.get(baseUrl + 'image', params);
  // },
  // /**
  //  * Retrieve summary of detection server
  //  * @param {Params} params
  //  * @returns {Response} response
  //  */
  // retrieveSummary(params) {
  // 	return ApiService.get(baseUrl + 'summary', params);
  // },
};

export default UserService;
