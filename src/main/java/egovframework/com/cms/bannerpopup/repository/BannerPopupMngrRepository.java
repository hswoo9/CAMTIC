package egovframework.com.cms.bannerpopup.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class BannerPopupMngrRepository extends AbstractDAO {

    public List<Map<String, Object>> getPopupList(Map<String, Object> params) {
        return selectList("bannerPopup.getPopupList", params);
    }

    public List<Map<String, Object>> getMainPopupList() {
        return selectList("bannerPopup.getMainPopupList");
    }

    public Map<String, Object> getBannerPopupOpenOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("bannerPopup.getBannerPopupOpenOne", params);
    }
    public Map<String, Object> getBannerPopupOne(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("bannerPopup.getBannerPopupOne", params);
    }

    public Map<String, Object> getBannerPopupFile(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("bannerPopup.getBannerPopupFile", params);
    }

    public void setBannerPopupInsert(Map<String, Object> params) {
        insert("bannerPopup.setBannerPopupInsert", params);
    }
    public void setBannerPopupUpdate(Map<String, Object> params) {
        update("bannerPopup.setBannerPopupUpdate", params);
    }
    public void setBannerPopupInsertFile(List<Map<String, Object>> list) {
        insert("bannerPopup.setBannerPopupInsertFile", list);
    }
    public void setBannerPopupDelete(Map<String, Object> params) {
        update("bannerPopup.setBannerPopupDelete", params);
    }
    public List<Map<String, Object>> getPopupCancleList() {
        return selectList("bannerPopup.getPopupCancleList");
    }
    public List<Map<String, Object>> getPopupAgreeList() {
        return selectList("bannerPopup.getPopupAgreeList");
    }
    public void setPopupCancleUpdate(Map<String, Object> params) {
        update("bannerPopup.setPopupCancleUpdate", params);
    }
    public void setPopupAgreeUpdate(Map<String, Object> params) {
        update("bannerPopup.setPopupAgreeUpdate", params);
    }
}
