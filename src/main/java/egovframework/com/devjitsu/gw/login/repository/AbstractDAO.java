package egovframework.com.devjitsu.gw.login.repository;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.mybatis.spring.SqlSessionTemplate;

import javax.annotation.Resource;
import java.util.List;

public class AbstractDAO {
    protected Log log = LogFactory.getLog(AbstractDAO.class);

    @Resource(name="sqlSessionTemplate")
    protected SqlSessionTemplate sqlSession;

    @Resource(name="sqlSessionTemplateMs")
    protected SqlSessionTemplate sqlSessionMs;

    protected void printQueryId(String queryId) {
        if(log.isDebugEnabled()){
            log.debug("\t QueryId  \t:  " + queryId);
        }
    }

    public Object insert(String queryId){
        printQueryId(queryId);
        return sqlSession.insert(queryId);
    }

    public Object insert(String queryId, Object params){
        printQueryId(queryId);
        return sqlSession.insert(queryId, params);
    }

    public Object insertMs(String queryId){
        printQueryId(queryId);
        return sqlSessionMs.insert(queryId);
    }

    public Object insertMs(String queryId, Object params){
        printQueryId(queryId);
        return sqlSessionMs.insert(queryId, params);
    }

    public Object update(String queryId, Object params){
        printQueryId(queryId);
        return sqlSession.update(queryId, params);
    }

    public Object delete(String queryId, Object params){
        printQueryId(queryId);
        return sqlSession.delete(queryId, params);
    }

    public Object selectOne(String queryId){
        printQueryId(queryId);
        return sqlSession.selectOne(queryId);
    }

    public Object selectOne(String queryId, Object params){
        printQueryId(queryId);
        return sqlSession.selectOne(queryId, params);
    }

    @SuppressWarnings("rawtypes")
    public List selectList(String queryId){
        printQueryId(queryId);
        return sqlSession.selectList(queryId);
    }

    @SuppressWarnings("rawtypes")
    public List selectList(String queryId, Object params){
        printQueryId(queryId);
        return sqlSession.selectList(queryId,params);
    }

    public Object selectOneMs(String queryId){
        printQueryId(queryId);
        return sqlSessionMs.selectOne(queryId);
    }

    public Object selectOneMs(String queryId, Object params){
        printQueryId(queryId);
        return sqlSessionMs.selectOne(queryId, params);
    }

    @SuppressWarnings("rawtypes")
    public List selectListMs(String queryId){
        printQueryId(queryId);
        return sqlSessionMs.selectList(queryId);
    }

    @SuppressWarnings("rawtypes")
    public List selectListMs(String queryId, Object params){
        printQueryId(queryId);
        return sqlSessionMs.selectList(queryId,params);
    }

//    public Object insertOra(String queryId, Object params){
//        printQueryId(queryId);
//        return sqlSessionOra.insert(queryId, params);
//    }
//
//    public Object updateOra(String queryId, Object params){
//        printQueryId(queryId);
//        return sqlSessionOra.update(queryId, params);
//    }
//
//    public Object deleteOra(String queryId, Object params){
//        printQueryId(queryId);
//        return sqlSessionOra.delete(queryId, params);
//    }
//
//    public Object selectOneOra(String queryId){
//        printQueryId(queryId);
//        return sqlSessionOra.selectOne(queryId);
//    }
//
//    public Object selectOneOra(String queryId, Object params){
//        printQueryId(queryId);
//        return sqlSessionOra.selectOne(queryId, params);
//    }
//
//    @SuppressWarnings("rawtypes")
//    public List selectListOra(String queryId){
//        printQueryId(queryId);
//        return sqlSessionOra.selectList(queryId);
//    }
//
//    @SuppressWarnings("rawtypes")
//    public List selectListOra(String queryId, Object params){
//        printQueryId(queryId);
//        return sqlSessionOra.selectList(queryId,params);
//    }

}
