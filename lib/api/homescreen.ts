import api from './axios'

export default {
  getAllCheckLists: () =>
    api.get(
      '/checklist_seeds.json?id=6dd919ce-57bd-4ca3-91f0-2923b9433edd&table=block&spaceId=772fc649-1fcc-498c-94cc-cff14dc51887&expirationTimestamp=1700301600000&signature=1SaQGe2pKrkYtW5EfCKS231ueiJctn4kwJfkvEyi-I0&downloadName=checklist_seeds.json',
    ),
}
