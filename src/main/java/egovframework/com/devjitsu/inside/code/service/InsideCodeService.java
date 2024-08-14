package egovframework.com.devjitsu.inside.code.service;

import java.util.List;
import java.util.Map;

public interface InsideCodeService {

    //KendoDropDownList 차량코드
    List<Map<String, Object>> getCarCode(Map<String, Object> params);

    //KendoDropDownList 회의실코드
    List<Map<String, Object>> getRoomCode(Map<String, Object> params);

    //차량사용신청 캘린더 단일데이터조회
    Map<String, Object> getCarRequestInfo(Map<String, Object> params);

    //차량사용신청 캘린더 리스트조회
    List<Map<String, Object>> getCarRequestList(Map<String, Object> params);

    //차량사용신청 중복조회
    List<Map<String, Object>> searchDuplicateCar(Map<String, Object> params);
    Map<String, Object> getCarStat(Map<String, Object> params);
    Map<String, Object> getRoomStat(Map<String, Object> params);

    //차량관리 차량코드 단일데이터조회
    Map<String, Object> getCarCodeInfo(Map<String, Object> params);

    //차량관리 차량코드 리스트조회
    List<Map<String, Object>> getCarCodeList(Map<String, Object> params);

    //회의실사용신청 캘린더 리스트조회
    List<Map<String, Object>> getRoomRequestList(Map<String, Object> params);
    Map<String, Object> getRoomRequest(Map<String, Object> params);

    //회의실사용신청 중복조회
    List<Map<String, Object>> searchDuplicateRoom(Map<String, Object> params);

    //회의실관리 회의실코드 단일데이터조회
    Map<String, Object> getRoomCodeInfo(Map<String, Object> params);

    //회의실관리 회의실코드 리스트조회
    List<Map<String, Object>> getRoomCodeList(Map<String, Object> params);



    //차량사용신청 등록
    void setCarRequestInsert(Map<String, Object> params);

    //차량사용신청 수정
    void setCarRequestUpdate(Map<String, Object> params);
    void setCarRequestDelete(Map<String, Object> params);

    //차량관리 차량코드 등록
    void setCarCodeInsert(Map<String, Object> params);

    //차량관리 차량코드 수정
    void setCarCodeUpdate(Map<String, Object> params);

    //차량관리 차량코드 삭제
    void setCarCodeDelete(Map<String, Object> params);

    //회의실사용신청 등록
    void setRoomRequestInsert(Map<String, Object> params);
    //회의실사용신청 삭제
    void setRoomRequestDelete(Map<String, Object> params);
    //회의실관리 회의실코드 등록
    void setRoomCodeInsert(Map<String, Object> params);

    //회의실관리 회의실코드 수정
    void setRoomCodeUpdate(Map<String, Object> params);

    //회의실관리 회의실코드 삭제
    void setRoomCodeDelete(Map<String, Object> params);



    /** 개인차량 결재 상태값에 따른 UPDATE 메서드 */
    void updateCarDocState(Map<String, Object> bodyMap) throws Exception;

    List<Map<String, Object>> getAccountList(Map<String, Object> params);

    void saveRegAccountTo(Map<String, Object> params);

    void updRegAccountTo(Map<String, Object> params);
    void delRegAccountTo(Map<String, Object> params);

    Map<String, Object> getAccountToInfo(Map<String, Object> params);

    int carRequestCheck(Map<String, Object> map);

    List<Map<String, Object>> getUserCarReqList(Map<String, Object> params);
}
