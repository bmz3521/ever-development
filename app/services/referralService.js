import axios from 'axios';
import {
  REFERRAL_URL,
  REFERRAL_KEY,
  CAMPAIGN_ID as campaign_id,
  CAMPAIGN_INFO as campaign_info,
  BRAND_ID as brand_id,
} from '@env';

const headers = {
  'x-api-key': REFERRAL_KEY,
  'x-brand-id': brand_id,
};

export const referralHandler = async ({ data, referral }) => {
  if (!referral) return;
  try {
    await addUserReferral({
      referrer_code: referral,
      referee_name: data.firstname,
      referee_email: data.email + '@everapp.io',
      referee_mobile: data.mobileNumber,
    });
    const resEnroll = await enrollUserReferral({
      fname: data.firstname,
      email: data.email + '@everapp.io',
      mobile: data.mobileNumber,
    });
    return resEnroll.data;
  } catch (e) {
    throw { err: { ...e.response, name: 'ReferralError' } };
  }
};

const addUserReferral = async ({
  referrer_code,
  referee_name,
  referee_email,
  referee_mobile,
}) => {
  return await axios.post(
    `${REFERRAL_URL}/conversion/add`,
    {
      order_id: new Date().getTime().toString(),
      campaign_id,
      event: 'register',
      referrer_code,
      referee_name,
      referee_email,
      referee_mobile,
    },
    { headers: headers },
  );
};

const enrollUserReferral = async ({ fname, email, mobile }) => {
  return await axios.post(
    `${REFERRAL_URL}/user/enrollment`,
    {
      campaign_id,
      fname,
      email,
      mobile,
      campaign_info,
    },
    { headers: headers },
  );
};
