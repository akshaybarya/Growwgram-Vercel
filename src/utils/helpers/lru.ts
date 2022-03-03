import { LRU_SIZE } from "../constants";
import { userData } from "../types";
import { getUserData, setUserData } from "./localStorage";

/**
 * LRU DESIGN USING ARRAY
 *
 * ADDING ELEMENTS FROM START -> [] -> REMOVING ELEMENTS FROM END
 * QUEUE LIKE IMPLEMENTATION
 *
 * DIFFERENCE
 *
 * IF AN ELEMENT IS FOUND THEN WE MOVE IT TO START
 *
 * THE SIZE OF ARRAY WILL BE FIXED
 */

const lru = (id?: string, data?: userData) => {
  const userData: userData[] = getUserData();

  if (data) return addDataToLRU(data, userData);

  if (userData.length === 0) return null;

  if (id) {
    let idx = -1;
    let temp = null;

    userData.forEach((user, index) => {
      if (user.details.username === id) {
        idx = index;
        temp = user;
      }
    });

    if (idx !== -1) {
      userData.splice(idx, 1);

      setUserData([temp, ...userData]);

      return [temp, ...userData];
    }
  }

  return null;
};

const addDataToLRU = (data: userData, userData: userData[]) => {
  if (userData.length >= LRU_SIZE) {
    userData.pop();
  }
  setUserData([data, ...userData]);
  return [data, ...userData];
};

export default lru;
