using System.Linq.Expressions;
using System.Text;

namespace IoT_Farm.Helpers
{
    public class SqlExpressionBuilder<T>
    {
        public string BuildWhereClause(Expression<Func<T, bool>> expression)
        {
            var visitor = new SqlExpressionVisitor();
            visitor.Visit(expression);
            return visitor.Sql.ToString();
        }
    }
    public class SqlExpressionVisitor : ExpressionVisitor
    {
        public StringBuilder Sql { get; } = new StringBuilder();
        protected override Expression VisitBinary(BinaryExpression node)
        {
            Sql.Append("(");
            Visit(node.Left);
            switch (node.NodeType)
            {
                case ExpressionType.Equal:
                    Sql.Append(" = ");
                    break;
                case ExpressionType.NotEqual:
                    Sql.Append(" <> ");
                    break;
                case ExpressionType.GreaterThan:
                    Sql.Append(" > ");
                    break;
                case ExpressionType.GreaterThanOrEqual:
                    Sql.Append(" >= ");
                    break;
                case ExpressionType.LessThan:
                    Sql.Append(" < ");
                    break;
                case ExpressionType.LessThanOrEqual:
                    Sql.Append(" <= ");
                    break;
                default:
                    throw new NotSupportedException($"Unsupported operator: {node.NodeType}");
            }
            Visit(node.Right);
            Sql.Append(")");
            return node;
        }
        protected override Expression VisitMember(MemberExpression node)
        {
            Sql.Append(node.Member.Name);
            return node;
        }
        protected override Expression VisitConstant(ConstantExpression node)
        {
            if (node.Value is string)
                Sql.Append($"'{node.Value}'");
            else
                Sql.Append(node.Value);
            return node;
        }
    }
}
