"""empty message

Revision ID: eaca36a7d34e
Revises: db014c14a80c
Create Date: 2024-05-11 14:38:07.024738

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eaca36a7d34e'
down_revision = 'db014c14a80c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('estadisticas', schema=None) as batch_op:
        batch_op.add_column(sa.Column('examenes_totales', sa.Integer(), nullable=True))
        batch_op.drop_column('media_examen')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('estadisticas', schema=None) as batch_op:
        batch_op.add_column(sa.Column('media_examen', sa.FLOAT(), nullable=True))
        batch_op.drop_column('examenes_totales')

    # ### end Alembic commands ###