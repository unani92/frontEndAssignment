import api from './axios'

export default {
  getAllCheckLists: () =>
    api.get(
      '/checklist_seeds.json?id=6dd919ce-57bd-4ca3-91f0-2923b9433edd&table=block&spaceId=772fc649-1fcc-498c-94cc-cff14dc51887&expirationTimestamp=1700553600000&signature=hdcARIT8WbtpkBb9cYk0X9UgM7mMEyupIR2w-2u4fCA&downloadName=checklist_seeds.json',
    ),
}
