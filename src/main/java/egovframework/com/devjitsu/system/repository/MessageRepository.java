package egovframework.com.devjitsu.system.repository;
import egovframework.com.devjitsu.gw.login.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class MessageRepository extends AbstractDAO {

    public List<Map<String, Object>> getMenuList(Map<String, Object> params) { return selectList("message.getMenuList", params); }
    public List<Map<String, Object>> getMenuListUser(Map<String, Object> params) { return selectList("message.getMenuListUser", params); }
    public List<Map<String, Object>> getMessageHistList(Map<String, Object> params) {
        return selectListPrjMs("messagePrj.getMessageHistList", params);
    }
    public List<Map<String, Object>> getMailHistList(Map<String, Object> params) {
        return selectList("message.getMailHistList", params);
    }
    public Map<String, Object> getMailHistData(Map<String, Object> params) {
        return (Map<String, Object>) selectOne("message.getMailHistData", params);
    }
    public List<Map<String, Object>> getMailDetList(Map<String, Object> params) {
        return selectList("message.getMailDetList", params);
    }


    public List<Map<String, Object>> test(Map<String, Object> params) { return selectListPrjMs("messagePrj.test", params); }

    public void msgSendSMS(Map<String, Object> params) { insertPrjMs("messagePrj.msgSendSMS", params); }
    public void msgSendMMS(Map<String, Object> params) { insertPrjMs("messagePrj.msgSendMMS", params); }


    public void setGroup(Map<String, Object> params) { insert("message.setGroup", params); }
    public void setGroupMod(Map<String, Object> params) { update("message.setGroupMod", params); }
    public void setGroupDel(Map<String, Object> params) { delete("message.setGroupDel", params);}
    public void setUser(Map<String, Object> params) { insert("message.setUser", params); }
    public void setUserMod(Map<String, Object> params) { update("message.setUserMod", params); }
    public void setUserDel(Map<String, Object> params) { update("message.setUserDel", params); }
    public void setMailHistIns(Map<String, Object> params) { insert("message.setMailHistIns", params); }
    public void setMailHistUpd(Map<String, Object> params) { update("message.setMailHistUpd", params); }
    public void setMailDetIns(Map<String, Object> params) { insert("message.setMailDetIns", params); }
    public void setMailDetCom(Map<String, Object> params) { update("message.setMailDetCom", params); }
    public void setMailDetDel(Map<String, Object> params) { delete("message.setMailDetDel", params); }
}
