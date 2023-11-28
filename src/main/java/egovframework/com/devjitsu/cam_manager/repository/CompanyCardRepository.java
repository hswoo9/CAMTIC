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
}
