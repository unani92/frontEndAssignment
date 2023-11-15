import api from './axios'

export default {
  getAllCheckLists: () =>
    api.get(
      '/checklist_seeds.json?id=6dd919ce-57bd-4ca3-91f0-2923b9433edd&table=block&spaceId=772fc649-1fcc-498c-94cc-cff14dc51887&expirationTimestamp=1700121600000&signature=Qhhy5pAUEXE1_56JTani5ZwVNfMz6vWD2TK6NA-rdGM&downloadName=checklist_seeds.json',
    ),
}
