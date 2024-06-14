package egovframework.com.devjitsu.docView.repository;

import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class DocViewProcessRepository extends AbstractDAO {
    public void updateCardLossApprStat(Map<String, Object> params) {
        update("docViewProcess.updateCardLossApprStat", params);
    }
    public void updateCardLossFinalApprStat(Map<String, Object> params) {
        update("docViewProcess.updateCardLossFinalApprStat", params);
    }
}
