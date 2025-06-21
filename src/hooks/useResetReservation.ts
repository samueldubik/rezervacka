export const useResetReservations = () => {
  fetch('/api/admin/resetReservation', {
    method: 'POST',
  });
};
