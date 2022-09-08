import { ANALYTICS_TYPE } from '../utils/enums';
import { axiosInstance } from './api';

export const getAllTimeUsersCount = async () => {
  return axiosInstance.get('/user/reporting/all-time');
}

export const getNewAccounts = async (type, startDate, endDate) => {
  const a = axiosInstance
  return a.get('/user/reporting/new-accounts', { 
    params: { 
      type,
      startDate,
      endDate 
    }
  });
}

export const getDeletedAccounts = async (type, startDate, endDate) => {
  const a = axiosInstance
  return a.get('/analytics', { 
    params: { 
      type,
      startDate,
      endDate,
      analyticTypes: [ANALYTICS_TYPE.DELETED_ACCOUNT]
    }
  });
}

export const getInvitesAndAccepting = async (type, startDate, endDate) => {
  const a = axiosInstance
  return a.get('/analytics', { 
    params: { 
      type,
      startDate,
      endDate,
      analyticTypes: [
        ANALYTICS_TYPE.INVITE_MYINS_USER,
        ANALYTICS_TYPE.INVITE_NON_USER,
        ANALYTICS_TYPE.ACCEPTED_MYINS_USER,
        ANALYTICS_TYPE.ACCEPTED_NON_USER
      ]
    }
  });
}
