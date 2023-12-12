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

    public Map<String, Object> getCardToInfo(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("card.getCardToInfo", params);
    }

    public void updRegCardTo(Map<String, Object> params) {
        update("card.updRegCardTo", params);
    }
}
