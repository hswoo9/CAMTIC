package egovframework.com.devjitsu.inside.code.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.inside.code.repository.InsideCodeRepository;
import egovframework.com.devjitsu.inside.code.service.InsideCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class InsideCodeServiceImpl implements InsideCodeService {

    @Autowired
    private InsideCodeRepository insideCodeRepository;

    @Override
    public List<Map<String, Object>> getCarCode(Map<String, Object> params) {
        return insideCodeRepository.getCarCode(params);
    }

    @Override
    public List<Map<String, Object>> getRoomCode(Map<String, Object> params) {
        return insideCodeRepository.getRoomCode(params);
    }

    @Override
    public Map<String, Object> getCarRequestInfo(Map<String, Object> params) {
        return insideCodeRepository.getCarRequestInfo(params);
    }

    @Override
    public List<Map<String, Object>> getCarRequestList(Map<String, Object> params) {
        return insideCodeRepository.getCarRequestList(params);
    }

    @Override
    public List<Map<String, Object>> searchDuplicateCar(Map<String, Object> params) {
        return insideCodeRepository.searchDuplicateCar(params);
    }

    @Override
    public Map<String, Object> getCarStat(Map<String, Object> params){
        Map<String, Object> result = new HashMap<>();
        result.put("type", insideCodeRepository.getCarStatType(params));
        result.put("total", insideCodeRepository.getCarStat(params));
        return result;
    }

    @Override
    public Map<String, Object> getRoomStat(Map<String, Object> params){
        Map<String, Object> result = new HashMap<>();
        result.put("type", insideCodeRepository.getRoomStatType(params));
        result.put("total", insideCodeRepository.getRoomStat(params));
        return result;
    }

    @Override
    public Map<String, Object> getCarCodeInfo(Map<String, Object> params) {
        return insideCodeRepository.getCarCodeInfo(params);
    }

    @Override
    public List<Map<String, Object>> getCarCodeList(Map<String, Object> params) {
        return insideCodeRepository.getCarCodeList(params);
    }

    @Override
    public List<Map<String, Object>> getRoomRequestList(Map<String, Object> params) {
        return insideCodeRepository.getRoomRequestList(params);
    }

    @Override
    public Map<String, Object> getRoomRequest(Map<String, Object> params) {
        return insideCodeRepository.getRoomRequest(params);
    }

    @Override
    public List<Map<String, Object>> searchDuplicateRoom(Map<String, Object> params) {
        return insideCodeRepository.searchDuplicateRoom(params);
    }

    @Override
    public Map<String, Object> getRoomCodeInfo(Map<String, Object> params) {
        return insideCodeRepository.getRoomCodeInfo(params);
    }

    @Override
    public List<Map<String, Object>> getRoomCodeList(Map<String, Object> params) {
        return insideCodeRepository.getRoomCodeList(params);
    }



    @Override
    public void setCarRequestInsert(Map<String, Object> params) {
        insideCodeRepository.setCarRequestInsert(params);
    }

    @Override
    public void setCarRequestUpdate(Map<String, Object> params) {
        insideCodeRepository.setCarRequestUpdate(params);
    }

    @Override
    public void setCarRequestDelete(Map<String, Object> params) {
        insideCodeRepository.setCarRequestDelete(params);
    }

    @Override
    public void setCarCodeInsert(Map<String, Object> params) {
        insideCodeRepository.setCarCodeInsert(params);
    }

    @Override
    public void setCarCodeUpdate(Map<String, Object> params) {
        insideCodeRepository.setCarCodeUpdate(params);
    }

    @Override
    public void setCarCodeDelete(Map<String, Object> params) {
        insideCodeRepository.setCarCodeDelete(params);
    }

    @Override
    public void setRoomRequestInsert(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> dataList = gson.fromJson((String) params.get("dataList"), new TypeToken<List<Map<String, Object>>>() {}.getType());
        for(Map<String, Object> data : dataList){
            if(StringUtils.isEmpty(data.get("roomReqSn"))){
                insideCodeRepository.setRoomRequestInsert(data);
            }else{
                insideCodeRepository.setRoomRequestUpdate(data);
            }
        }
    }

    @Override
    public void setRoomRequestDelete(Map<String, Object> params) {
        insideCodeRepository.setRoomRequestDelete(params);
    }

    @Override
    public void setRoomCodeInsert(Map<String, Object> params) {
        insideCodeRepository.setRoomCodeInsert(params);
    }

    @Override
    public void setRoomCodeUpdate(Map<String, Object> params) {
        insideCodeRepository.setRoomCodeUpdate(params);
    }

    @Override
    public void setRoomCodeDelete(Map<String, Object> params) {
        insideCodeRepository.setRoomCodeDelete(params);
    }

    @Override
    public void updateCarDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("carReqSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            insideCodeRepository.updateCarApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            insideCodeRepository.updateCarApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            insideCodeRepository.updateCarFinalApprStat(params);
        }
    }

    @Override
    public List<Map<String, Object>> getAccountList(Map<String, Object> params) {
        return insideCodeRepository.getAccountList(params);
    }

    @Override
    public void saveRegAccountTo(Map<String, Object> params) {
        insideCodeRepository.saveRegAccountTo(params);
    }

    @Override
    public void updRegAccountTo(Map<String, Object> params) {
        insideCodeRepository.updRegAccountTo(params);
    }
    @Override
    public void delRegAccountTo(Map<String, Object> params) {
        insideCodeRepository.delRegAccountTo(params);
    }

    @Override
    public Map<String, Object> getAccountToInfo(Map<String, Object> params) {
        return insideCodeRepository.getAccountToInfo(params);
    }

    @Override
    public int carRequestCheck(Map<String, Object> map) {
        return insideCodeRepository.carRequestCheck(map);
    }
}
