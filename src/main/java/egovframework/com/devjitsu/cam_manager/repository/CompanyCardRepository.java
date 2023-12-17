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
    public void saveRegCardTo(Map<String, Object> params) {
        insert("card.saveRegCardTo", params);
    }

    public void delCardTo(Map<String, Object> params) {
        update("card.delCardTo", params);
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
    public List<Map<String, Object>> getCardUserGroup(Map<String, Object> params) {
        return selectList("card.getCardUserGroup", params);
    }
    public List<Map<String, Object>> getcardUserGroupList(Map<String, Object> params) {
        return selectList("card.getcardUserGroupList", params);
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
}
