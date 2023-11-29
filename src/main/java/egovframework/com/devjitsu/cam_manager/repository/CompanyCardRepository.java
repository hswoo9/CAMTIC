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
}
