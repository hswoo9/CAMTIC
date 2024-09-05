package egovframework.com.devjitsu.cam_manager.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CompanyCardRepository extends AbstractDAO {


    public List<Map<String, Object>> cardUseList(Map<String, Object> params) {
        return selectList("card.cardUseList", params);
    }

    public Map<String, Object> useCardDetailInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("card.useCardDetailInfo", params);
    }

    public List<Map<String, Object>> getCardTOData(Map<String, Object> params) {
        return selectList("card.getCardTOData", params);
    }

    public List<Map<String, Object>> getCardTOData2(Map<String, Object> params) {
        return selectList("card.getCardTOData2", params);
    }
    public void saveRegCardTo(Map<String, Object> params) {
        insert("card.saveRegCardTo", params);
    }

    public void delCardTo(Map<String, Object> params) {
        delete("card.delCardTo", params);
//        update("card.delCardTo", params);
    }
    public void delCardHist(Map<String, Object> params) {
        delete("card.delCardHist", params);
    }

    public Map<String, Object> getCardToInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("card.getCardToInfo", params);
    }
    public int getCardUseCheck(Map<String, Object> params) {
        return (int) selectOne("card.getCardUseCheck", params);
    }

    public void updRegCardTo(Map<String, Object> params) {
        update("card.updRegCardTo", params);
    }

    public void insUseCardHist(Map<String, Object> params) {
        insert("card.insUseCardHist", params);
    }

    public List<Map<String, Object>> cardToUseList(Map<String, Object> params) {
        return selectList("card.cardToUseList", params);
    }

    public List<Map<String, Object>> getCardTOHistList(Map<String, Object> params) {
        return selectList("card.getCardTOHistList", params);
    }
    public void updCardFromDe(Map<String, Object> params) {
        update("card.updCardFromDe", params);
    }

    public void saveCardUserGroup(Map<String, Object> params) {
        insert("card.saveCardUserGroup", params);
    }
    public void updateCardUserGroup(Map<String, Object> params) {
        update("card.updateCardUserGroup", params);
    }
    public void saveCardUserGroupList(Map<String, Object> params) {
        insert("card.saveCardUserGroupList", params);
    }
    public void saveCardUserGroupSel(Map<String, Object> params) {
        insert("card.saveCardUserGroupSel", params);
    }
    public void saveCardUserGroupSelCancle(Map<String, Object> params) {
        delete("card.saveCardUserGroupSelCancle", params);
    }
    public List<Map<String, Object>> getCardUserGroup(Map<String, Object> params) {
        return selectList("card.getCardUserGroup", params);
    }
    public List<Map<String, Object>> getcardUserGroupList(Map<String, Object> params) {
        return selectList("card.getcardUserGroupList", params);
    }
    public List<Map<String, Object>> getcardUserGroupSel(Map<String, Object> params) {
        return selectList("card.getcardUserGroupSel", params);
    }

    public Map<String, Object> getCardGroupNumCheck(){
        return (Map<String, Object>) selectOne("card.getCardGroupNumCheck");
    }
    public List<Map<String, Object>> getCardGroupCheck(){
        return selectList("card.getCardGroupCheck");
    }
    public List<Map<String, Object>> getCardGroupPrivateCheck(Map<String, Object> params){
        return selectList("card.getCardGroupPrivateCheck", params);
    }
    public void delCardUserGroup(Map<String, Object> params) {
        delete("card.delCardUserGroup", params);
    }
    public void delCardUserGroupList(Map<String, Object> params) {
        delete("card.delCardUserGroupList", params);
    }
    public Map<String, Object> getCardUserGroupOne(Map<String, Object> param){
        return (Map<String, Object>) selectOne("card.getCardUserGroupOne", param);
    }

    public int getCardUserGroupCheck(Map<String, Object> param){
        return (int) selectOne("card.getCardUserGroupCheck", param);
    }

    public void delGroupUser(Map<String, Object> params) {
        delete("card.delGroupUser", params);
    }
    public void delGroupUserAll(Map<String, Object> params) {
        delete("card.delGroupUserAll", params);
    }

    public void insPrivateCard(Map<String, Object> params) {
        insert("card.insPrivateCard", params);
    }

    public List<Map<String, Object>> getPrivateCardList(Map<String, Object> params) {
        return selectList("card.getPrivateCardList", params);
    }

    public void delPrivateCard(Map<String, Object> map) {
        delete("card.delPrivateCard", map);
    }

    public List<Map<String, Object>> getCorpCardList(Map<String, Object> params) {
        return selectList("card.getCorpCardList", params);
    }

    public List<Map<String, Object>> getCardList(Map<String, Object> params) {
        return selectList("card.getCardList", params);
    }

    public Map<String, Object> getCardManagerData(Map<String, Object> map) {
        return (Map<String, Object>) selectOne("card.getCardManagerData", map);
    }

    public void insCardManager(Map<String, Object> map) {
        insert("card.insCardManager", map);
    }

    public void updCardManager(Map<String, Object> map) {
        update("card.updCardManager", map);
    }

    public Map<String, Object> getCardHolderData(Map<String, Object> map) {
        return (Map<String, Object>) selectOne("card.getCardHolderData", map);
    }

    public void insCardHolder(Map<String, Object> map) {
        insert("card.insCardHolder", map);
    }

    public void updCardHolder(Map<String, Object> map) {
        update("card.updCardHolder", map);
    }

    public List<Map<String, Object>> getUserCardList(Map<String, Object> params) {
        return selectList("card.getUserCardList", params);
    }

    public List<Map<String, Object>> getCardAuthList(Map<String, Object> params) {
        return selectList("card.getCardAuthList", params);
    }

    public List<Map<String, Object>> getCardAuthUserList(Map<String, Object> params) {
        return selectList("card.getCardAuthUserList", params);
    }

    public void setCardAuthData(Map<String, Object> params) {
        insert("card.setCardAuthData", params);
    }

    public void delCardAuthData(Map<String, Object> params) {
        delete("card.delCardAuthData", params);
    }

    public void setCardAuthUserData(Map<String, Object> params) {
        insert("card.setCardAuthUserData", params);
    }

    public void delCardAuthUserData(Map<String, Object> params) {
        delete("card.delCardAuthUserData", params);
    }

    public List<Map<String, Object>> cardAllList(Map<String, Object> params) {
        return selectList("card.cardAllList", params);
    }

    public List<Map<String, Object>> cardAllListExcel(Map<String, Object> params) {
        return selectList("card.cardAllListExcel", params);
    }

    public void insMeetingData(Map<String, Object> params) {
        insert("card.insMeetingData", params);
    }

    public void insMeetingExternal(Map<String, Object> extMap) {
        insert("card.insMeetingExternal", extMap);
    }

    public void updMeetingData(Map<String, Object> params) {
        update("card.updMeetingData", params);
    }

    public void updCardToByFrKey(Map<String, Object> params) {
        update("card.updCardToByFrKey", params);
    }

    public List<Map<String, Object>> getMeetingList(Map<String, Object> params) {
        return selectList("card.getMeetingList", params);
    }

    public Map<String, Object> getMeetingData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("card.getMeetingData", params);
    }

    public List<Map<String, Object>> getExtData(Map<String, Object> params) {
        return selectList("card.getExtData", params);
    }

    public void updateMeetingApprStat(Map<String, Object> params) {
        update("card.updateMeetingApprStat", params);
    }
    public void updateMeetingFinalApprStat(Map<String, Object> params) {
        update("card.updateMeetingFinalApprStat", params);
    }

    public Map<String, Object> getCardInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("card.getCardInfo", params);
    }
}
