package egovframework.com.devjitsu.common.repository;

import egovframework.com.devjitsu.main.repository.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


@Repository("CommFileDAO")
public class CommFileDAO extends AbstractDAO {

    @SuppressWarnings("unchecked")
    public Map<String, Object> selectGroupPath(Map<String, Object> param) throws Exception {
        return (Map<String, Object>)selectOne("commFile.selectGroupPathList", param);
    }

    /**
     * @MethodName : commFileInfoInsert
     * @author : gato
     * @since : 2018. 1. 5.
     * 설명 : 정보시스템 요청 첨부파일 최초저장
     */
    public void commFileInfoInsert(Map<String, Object> map) throws Exception {
        insert("commFile.commFileInfoInsert", map);

    }

    /**
     * @MethodName : commFileInfoUpdate
     * @author : gato
     * @since : 2018. 1. 5.
     * 설명 : 정보시스템 요청 첨부파일 명, 확장자, 크기, 경로 저장
     */
    public void commFileInfoUpdate(Map<String, Object> map) throws Exception {
        update("commFile.commFileInfoUpdate", map);

    }

    public Object getCommFileSeq(Map<String, Object> map) throws Exception {
        return selectOne("commFile.getCommFileSeq", map);
    }

    public List<Map<String, Object>> getAttachFileList(Map<String, Object> paramMap) {
        return selectList("commFile.getAttachFileList", paramMap);
    }

    public Object getCommFileList(Map<String, Object> paramMap) {
        return selectList("commFile.getCommFileList", paramMap);
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> commFileDownLoad(Map<String, Object> map) throws Exception {
        return (Map<String, Object>) selectOne("commFile.commFileDownLoad", map);
    }

    public void commFileDelete(String attach_file_id) throws Exception {
        update("commFile.commFileDelete", attach_file_id);
    }

    public void setCommFileDelete(Map<String, Object> map) {
        delete("commFile.setCommFileDelete", map);
    }
}
