export const cancelRightClick = (e) => {
  if (e.button === 2) {   // 2 = right mouse button
    e.preventDefault();
    return false;         // stop further handling
  }
};