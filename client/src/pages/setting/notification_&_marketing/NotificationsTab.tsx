import React, { useEffect } from "react";
import MarketingSetting from "./MarketingSetting";
import { fetchMarketingSetting } from "./marketingSettingSlice";
import { useDispatch } from "react-redux";
import { store } from "../../../stores/store";
import NotificationSetting from "./NotificactionsSetting";
import { fetchNotificationSetting } from "./notificationSettingSlice";

const NotificationsTab: React.FC = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  
  useEffect(() => {
    dispatch(fetchMarketingSetting());
    dispatch(fetchNotificationSetting());
  });
  
  return (
    <div>
      {/* Section Notifications */}
      <NotificationSetting />

      {/* Paramètres de Communication / Marketing */}
      <MarketingSetting />
    </div>
  );
};

export default NotificationsTab;
