package egovframework.com.devjitsu.cam_manager.service;

import java.util.List;
import java.util.Map;

public interface CompanyCardService {


    List<Map<String, Object>> cardUseList(Map<String, Object> params);

    Map<String, Object> useCardDetailInfo(Map<String, Object> params);

    List<Map<String, Object>> getCardTOData(Map<String, Object> params);

    List<Map<String, Object>> getCardTOData2(Map<String, Object> params);

    void saveRegCardTo(Map<String, Object> params);

    void delCardTo(Map<String, Object> params);
    void delCardHist(Map<String, Object> params);

    Map<String, Object> getCardToInfo(Map<String, Object> params);
    int getCardUseCheck(Map<String, Object> params);

    void updRegCardTo(Map<String, Object> params);

    void setUseCardHist(Map<String, Object> params);

    List<Map<String, Object>> cardToUseList(Map<String, Object> params);

    List<Map<String, Object>> getCardTOHistList(Map<String, Object> params);

    void updCardFromDe(Map<String, Object> params);
    void saveCardUserGroup(Map<String, Object> params);
    void saveCardUserGroupList(Map<String, Object> params);
    void saveCardUserGroupSel(Map<String, Object> params);
    void saveCardUserGroupSelCancle(Map<String, Object> params);
    List<Map<String, Object>> getCardUserGroup(Map<String, Object> params);
    List<Map<String, Object>> getcardUserGroupList(Map<String, Object> params);
    List<Map<String, Object>> getcardUserGroupSel(Map<String, Object> params);
    void delCardUserGroup(Map<String, Object> params);
    Map<String, Object> getCardUserGroupOne(Map<String, Object> param);

    void delGroupUser(Map<String, Object> params);

    void setPrivateCard(Map<String, Object> params);

    void setCardManager(Map<String, Object> params);

    void setCardHolder(Map<String, Object> params);

    List<Map<String, Object>> getCardAuthList(Map<String, Object> params);

    List<Map<String, Object>> getCardAuthUserList(Map<String, Object> params);

    void setCardAuthData(Map<String, Object> params);

    void delCardAuthData(Map<String, Object> params);

    void setCardAuthUserData(Map<String, Object> params);

    void delCardAuthUserData(Map<String, Object> params);

    List<Map<String, Object>> cardAllList(Map<String, Object> params);

    void setMeetingData(Map<String, Object> params);

    List<Map<String, Object>> getMeetingList(Map<String, Object> params);

    Map<String, Object> getMeetingData(Map<String, Object> params);

    List<Map<String, Object>> getExtData(Map<String, Object> params);

    /** 회의실사용사전승인신청서 결재 상태값에 따른 UPDATE 메서드 */
    void updateMeetingDocState(Map<String, Object> bodyMap) throws Exception;

    Map<String, Object> getCardInfo(Map<String, Object> params);
}
